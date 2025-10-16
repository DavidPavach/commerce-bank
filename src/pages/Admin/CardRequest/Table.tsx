import { useState } from "react";
import { toast } from "react-fox-toast";

//Utils and Services
import { formatCardNumber, maskCardNumber } from "@/utils/format";
import { useUpdateCardRequest, useDeleteCardRequest } from "@/services/mutations.service";

//Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getStatusColor, getStatusIcon } from "@/components/Utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


//Icons
import { CreditCard, Search, Eye, EyeOff, CheckCircle2, XCircle, Clock, Loader, Trash, CircleCheck, ClockFading, X } from "lucide-react";
import { More } from "iconsax-react";


export function CardRequestTable({ data }: { data: CardRequest[] }) {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [runningId, setRunningId] = useState<string>("");
    const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

    const toggleCardVisibility = (cardId: string) => {
        setVisibleCards((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(cardId)) {
                newSet.delete(cardId)
            } else {
                newSet.add(cardId)
            }
            return newSet
        })
    }

    const filteredData = data.filter(
        (item) =>
            item.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cardNumber.includes(searchTerm) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const stats = {
        total: data.length,
        pending: data.filter((d) => d.status === "pending").length,
        approved: data.filter((d) => d.status === "successful").length,
        rejected: data.filter((d) => d.status === "declined").length,
    }

    //Functions
    const deleteActivity = useDeleteCardRequest();
    const handleDelete = (requestId: string) => {

        const proceed = confirm("Delete Card Request?");
        if (!proceed) return toast.error("Deletion was cancelled");
        setRunningId(requestId);

        deleteActivity.mutate(requestId, {
            onSuccess: (response) => {
                toast.success(response.message || `Card Request was deleted successfully!`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't delete Card Request, kindly try again.`;
                toast.error(message);
            }
        })
    }

    const updateStatus = useUpdateCardRequest();
    const handleUpdate = (requestId: string, status: string) => {

        setRunningId(requestId);
        updateStatus.mutate({ requestId, status }, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Card Request was updated successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update card request, kindly try again.";
                toast.error(message);
            },
        })
    }

    return (
        <div className="space-y-6">
            <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Total Cards</CardTitle>
                        <CreditCard className="size-6 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-xl md:text-2xl xl:text-3xl">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Pending</CardTitle>
                        <Clock className="size-6 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-yellow-600 text-xl md:text-2xl xl:text-3xl">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Approved</CardTitle>
                        <CheckCircle2 className="size-6 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-green-600 text-xl md:text-2xl xl:text-3xl">{stats.approved}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-medium text-sm md:text-base xl:text-lg">Rejected</CardTitle>
                        <XCircle className="size-6 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-red-600 text-xl md:text-2xl xl:text-3xl">{stats.rejected}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 text-white">
                <div className="relative flex-1">
                    <Search className="top-1/2 left-3 absolute size-4 -translate-y-1/2" />
                    <Input placeholder="Search by name, email, card number, or status..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Card Number</TableHead>
                                    <TableHead>Expiry</TableHead>
                                    <TableHead>CVV</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-8 text-center">
                                            <div className="flex flex-col items-center gap-2 text-neutral-500">
                                                <CreditCard className="size-8" />
                                                <p>No card verifications found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item) => {
                                        const cardId = item._id || item.cardNumber
                                        const isVisible = visibleCards.has(cardId)

                                        return (
                                            <TableRow key={cardId}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-10">
                                                            <AvatarImage src={item.user.profilePicture || "/placeholder.svg"} alt={item.user.fullName} />
                                                            <AvatarFallback>
                                                                {item.user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium capitalize">{item.user.fullName}</span>
                                                                {item.user.isOnline ? <span className="bg-green-500 rounded-full size-2" /> : <span className="bg-red-500 rounded-full size-2" />}
                                                            </div>
                                                            <span className="text-neutral-500 text-sm first-letter:uppercase">{item.user.email}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="min-w-48">
                                                    <code className="font-mono text-sm">
                                                        {isVisible ? formatCardNumber(item.cardNumber) : maskCardNumber(item.cardNumber)}
                                                    </code>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="font-mono font-semibold text-sm">{isVisible ? item.cardExpiryDate : "••/••"}</code>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="font-mono text-sm">{isVisible ? item.cardCVV : "•••"}</code>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                                                        {getStatusIcon(item.status)}
                                                        <span className="ml-1 capitalize">{item.status}</span>
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                        <span className="text-neutral-500 text-xs">
                                                            {new Date(item.createdAt).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="flex items-center gap-x-5">
                                                    {isVisible ? <EyeOff className="size-6" onClick={() => toggleCardVisibility(cardId)} /> : <Eye className="size-6" onClick={() => toggleCardVisibility(cardId)} />}
                                                    {runningId === item._id ? <Loader className="size-6 text-blue-600 animate-spin" /> : <Trash className="size-6 text-red-600" onClick={() => handleDelete(item._id)} />}
                                                    {runningId === item._id ? <Loader className="size-6 animate-spin" /> : <Popover>
                                                        <PopoverTrigger asChild>
                                                            <More variant="Bold" className="size-6 cursor-pointer" />
                                                        </PopoverTrigger>
                                                        <PopoverContent className="space-y-4 p-4 w-fit text-[11px] md:text-xs xl:text-sm">
                                                            <p className="mb-2">Update Status</p>
                                                            <button onClick={() => handleUpdate(item._id, "successful")} className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-2 py-0.5 rounded w-full text-green-600 text-left">
                                                                <CircleCheck className="size-4" /> Successful
                                                            </button>
                                                            <button onClick={() => handleUpdate(item._id, "pending")} className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 px-2 py-0.5 rounded w-full text-yellow-600 text-left">
                                                                <ClockFading className="size-4" /> Pending
                                                            </button>
                                                            <button onClick={() => handleUpdate(item._id, "declined")} className="flex items-center gap-1 bg-red-100 hover:bg-red-100 px-2 py-0.5 rounded w-full text-red-600 text-left">
                                                                <X className="size-4" /> Failed
                                                            </button>
                                                        </PopoverContent>
                                                    </Popover>}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
