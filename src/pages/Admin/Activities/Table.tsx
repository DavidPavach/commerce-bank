import { useState } from "react";
import { toast } from "react-fox-toast";

//Utils and Services
import { formatDate, formatMetadataKey } from "@/utils/format";
import { useAdminDeleteActivity } from "@/services/mutations.service";

//Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getActionBadge, getRoleBadge, renderMetadataValue } from "@/components/Utils";

//Icons
import { Search, ChevronDown, ChevronRight, Loader } from "lucide-react";
import { Calendar, SearchNormal, TagUser, Trash } from "iconsax-react";


export function ActivityTable({ data }: { data: Activity[] }) {

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
    const [runningId, setRunningId] = useState<string>("")

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedRows(newExpanded)
    }

    // Filter data based on search term
    const filteredData = data.filter(
        (item) =>
            item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.admin.role.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Calculate summary statistics
    const totalActions = data.length
    const uniqueAdmins = new Set(data.map((item) => item.admin.email)).size
    const actionTypes = new Set(data.map((item) => item.action)).size


    const deleteActivity = useAdminDeleteActivity();
    const handleDelete = (activityId: string) => {

        const proceed = confirm("Delete Activity?");
        if (!proceed) return toast.error("Deletion was cancelled");
        setRunningId(activityId);

        deleteActivity.mutate(activityId, {
            onSuccess: (response) => {
                toast.success(response.message || `Activity was deleted successfully!`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't delete activity, kindly try again.`;
                toast.error(message);
            }
        })
    }


    return (
        <div className="space-y-6">
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Total Activities</CardTitle>
                        <Calendar variant="Bulk" className="size-6 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-primary text-xl md:text-2xl xl:text-3xl">{totalActions}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Unique Admins</CardTitle>
                        <TagUser variant="Bulk" className="size-6 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-blue-600 text-xl md:text-2xl xl:text-3xl">{uniqueAdmins}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Action Types</CardTitle>
                        <SearchNormal variant="Bulk" className="size-6 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-accent text-xl md:text-2xl xl:text-3xl">{actionTypes}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-2 text-white">
                <div className="relative flex-1 max-w-sm">
                    <Search className="top-2.5 md:top-3 left-2 absolute size-4" />
                    <Input placeholder="Search activities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Admin</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((item) => {
                                    const isExpanded = expandedRows.has(item._id)
                                    const metadataEntries = Object.entries(item.metadata)

                                    return (
                                        <Collapsible key={item._id} open={isExpanded} onOpenChange={() => toggleRow(item._id)} asChild>
                                            <>
                                                <TableRow className="cursor-pointer">
                                                    <TableCell>
                                                        <CollapsibleTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="p-0 size-8">
                                                                {isExpanded ? (
                                                                    <ChevronDown className="size-4" />
                                                                ) : (
                                                                    <ChevronRight className="size-4" />
                                                                )}
                                                            </Button>
                                                        </CollapsibleTrigger>
                                                    </TableCell>
                                                    <TableCell>{getActionBadge(item.action)}</TableCell>
                                                    <TableCell className="font-medium">{item.admin.email}</TableCell>
                                                    <TableCell>{getRoleBadge(item.admin.role)}</TableCell>
                                                    <TableCell className="min-w-40">{formatDate(item.createdAt)}</TableCell>
                                                </TableRow>
                                                <CollapsibleContent asChild>
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="bg-muted/50 p-0">
                                                            <div className="space-y-4 p-4">
                                                                <div>
                                                                    <h4 className="mb-2 font-semibold text-sm">Metadata Details</h4>
                                                                    <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                                                                        {metadataEntries.length > 0 ? (
                                                                            metadataEntries.map(([key, value]) => (
                                                                                <div key={key} className="flex flex-col space-y-1 p-3 border rounded-md">
                                                                                    <span className="font-medium text-muted-foreground text-xs">
                                                                                        {formatMetadataKey(key)}
                                                                                    </span>
                                                                                    <span className="font-mono text-sm break-all first-letter:uppercase">
                                                                                        {renderMetadataValue(value)}
                                                                                    </span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <div className="col-span-2 text-muted-foreground text-sm">
                                                                                No metadata available
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-2 border-t">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <span className="font-medium text-blueBlack text-xs">Last Updated</span>
                                                                        <span className="text-sm">{formatDate(item.updatedAt)}</span>
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <span className="font-medium text-blueBlack text-xs">Actions</span>
                                                                        <span>{runningId ? <Loader className="text-blue-600 animate-spin" /> : <Trash onClick={() => handleDelete(item._id)} variant="Bold" className="size-6 text-red-600 cursor-pointer" />}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </CollapsibleContent>
                                            </>
                                        </Collapsible>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {filteredData.length === 0 && (
                <div className="py-8 text-white text-center">No activities found matching your search.</div>
            )}
        </div>
    )
}
