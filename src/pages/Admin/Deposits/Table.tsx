import { useState } from "react";
import { toast } from "react-fox-toast";

//Services and Utils
import { useDeleteDepositRequest, useEditDepositRequest } from "@/services/mutations.service";
import { formatCurrency, formatDate } from "@/utils/format";

//Components
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//Icons
import { Loader, Trash } from "lucide-react";


export function Table({ data }: { data: DepositRequest[] }) {

    const [loadingId, setLoadingId] = useState<string>("")

    const updateDepositRequest = useEditDepositRequest()
    const handleEdit = (id: string, isAccepted?: "accepted" | "declined" | "pending", status?: "successful" | "failed" | "pending") => {
        const formData = { id, ...(isAccepted !== undefined ? { isAccepted } : {}), ...(status !== undefined ? { status } : {}) }

        toast.info("Updating Details...")

        updateDepositRequest.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.message || `The request was updated successfully!`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't update deposit request, kindly try again.`;
                toast.error(message);
            }
        })
    }

    const deleteDepositRequest = useDeleteDepositRequest()
    const handleDelete = (id: string) => {

        const proceed = confirm("Delete Deposit Request");
        if (!proceed) return toast.error("Deletion was cancelled");
        setLoadingId(id);

        deleteDepositRequest.mutate(id, {
            onSuccess: (response) => {
                toast.success(response.message || `The request was deleted successfully!`);
                setLoadingId("");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't delete deposit request, kindly try again.`;
                toast.error(message);
                setLoadingId("");
            }
        })
    }


    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-nowrap">
                        <thead>
                            <tr className="bg-neutral-50 [&>*]:px-4 [&>*]:py-3 border-b [&>*]:font-semibold [&>*]:text-left">
                                <th>User</th>
                                <th>Amount</th>
                                <th>Is Accepted</th>
                                <th>Status</th>
                                <th>Requested At?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id} className="hover:bg-neutral-100 [&>*]:px-4 [&>*]:py-3 border-b transition-colors">

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-8">
                                                <AvatarImage src={item.user.profilePicture} alt={item.user.fullName} />
                                                <AvatarFallback>
                                                    {item.user.fullName.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="font-medium truncate capitalize">{item.user.fullName}</p>
                                                <p className="text-neutral-500 text-xs truncate first-letter:uppercase">{item.user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="font-semibold">{formatCurrency(item.amount)}</span>
                                    </td>

                                    <td>
                                        <Select value={item.isAccepted} onValueChange={(value) => handleEdit(item._id, value as "accepted" | "declined" | "pending", undefined)}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-xs md:text-sm xl:text-base" value="pending">Pending</SelectItem>
                                                <SelectItem className="text-xs md:text-sm xl:text-base" value="accepted">Accepted</SelectItem>
                                                <SelectItem className="text-xs md:text-sm xl:text-base" value="declined">Declined</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>

                                    <td>
                                        <Select value={item.status} onValueChange={(value) => handleEdit(item._id, undefined, value as "successful" | "failed" | "pending")}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-xs md:text-sm xl:text-base" value="pending">Pending</SelectItem>
                                                <SelectItem className="text-xs md:text-sm xl:text-base" value="successful">Successful</SelectItem>
                                                <SelectItem className="text-xs md:text-sm xl:text-base" value="failed">Failed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="text-neutral-500 text-xs">{formatDate(item.createdAt)}</td>
                                    <td>{loadingId === item._id ? <Loader className="size-5 md:size-6 animate-spin" /> : <Trash onClick={() => handleDelete(item._id)} className="size-5 md:size-6 text-red-600 cursor-pointer" />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
