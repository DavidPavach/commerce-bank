import { useState } from "react";
import { toast } from "react-fox-toast";

//Types, Utils and Services
import { TransactionWithUser } from "@/types";
import { formatCurrency } from "@/utils/format";
import { getIcon, getStatusBadge } from "@/components/Utils";
import { useDeleteTransaction, useUpdateTransaction } from "@/services/mutations.service";

//Components
import TransactionDetails from "./Details";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

//Icons
import { Trash, FolderOpen, More } from "iconsax-react";
import { CircleCheck, CirclePause, ClockFading, Loader, Undo2, X } from "lucide-react";

const Table = ({ transactions }: { transactions: TransactionWithUser[] }) => {

    const [showTransaction, setShowTransaction] = useState<TransactionWithUser | null>(null);
    const [loading, setLoading] = useState<string>("")

    //Functions
    const toggleShowTransaction = () => setShowTransaction(null);

    const deleteTransaction = useDeleteTransaction();
    const handleDelete = (id: string) => {

        const proceed = confirm("Delete Transaction");
        if (!proceed) return toast.error("Deletion was cancelled");
        setLoading(id);

        deleteTransaction.mutate(id, {
            onSuccess: (response) => {
                toast.success(response.message || "The transaction was deleted successfully!");
                setLoading("");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't delete transaction, kindly try again.";
                toast.error(message);
                setLoading("");
            }
        })
    }

    const updateTransaction = useUpdateTransaction()
    const handleStatus = (id: string, status: string) => {

        setLoading(id);
        updateTransaction.mutate({ transactionId: id, status }, {
            onSuccess: (response) => {
                toast.success(response.message || "The transaction was updated successfully!");
                setLoading("");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Transaction update failed, kindly try again.";
                toast.error(message);
                setLoading("");
            },
        })
    }

    return (
        <>
            {showTransaction && (
                <main className="z-30 fixed inset-0 bg-black/90 overflow-y-auto">
                    <div className="flex justify-center items-center p-2 min-w-full max-w-2xl min-h-dvh">
                        <TransactionDetails onClose={toggleShowTransaction} transaction={showTransaction} />
                    </div>
                </main>
            )}
            <main className="w-full overflow-x-auto">
                <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-3 font-medium text-sm text-left">S/N</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">User</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Amount</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Level</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Description</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Type</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Mode</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Status</th>
                            <th className="px-4 py-3 font-medium text-sm text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx, index) => (
                                <tr key={tx._id} className="border-gray-700 border-b">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {tx.user.profilePicture ? <img src={tx.user.profilePicture} alt="profile" className="rounded-full size-6 md:size-7 xl:size-8 shrink-0" /> : <div className="flex justify-center items-center bg-gray-200 rounded-full size-6 md:size-7 xl:size-8 font-bold text-primary uppercase">
                                                {tx.user.fullName.slice(0, 2)}</div>}
                                            <div>
                                                <p className="text-sm capitalize">{tx.user.fullName}</p>
                                                <p className="text-gray-400 text-xs">{tx.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{formatCurrency(tx.amount)}</td>
                                    <td className="px-4 py-3 uppercase">{tx.level}</td>
                                    <td className="px-4 py-3 capitalize">{tx.description ?? "No Description"}</td>
                                    <td className="px-4 py-3 capitalize">{tx.transactionType}</td>
                                    <td className="px-4 py-3">{getIcon(tx.subType, true)}</td>
                                    <td className="px-4 py-3">{getStatusBadge(tx.status)}</td>
                                    <td className="flex justify-between items-center gap-x-3 px-4 py-3">
                                        {loading === tx._id ? <Loader className="size-5 xl:size-6 animate-spin" /> : <Trash onClick={() => handleDelete(tx._id)} variant="Bold" className="size-5 xl:size-6 text-red-500 cursor-pointer" />}
                                        <FolderOpen onClick={() => setShowTransaction(tx)} variant="Bold" className="size-5 xl:size-6 text-blue-500 cursor-pointer" />
                                        {loading === tx._id ? <Loader className="size-5 xl:size-6 animate-spin" /> : <Popover>
                                            <PopoverTrigger asChild>
                                                <More variant="Bold" className="size-5 xl:size-6 cursor-pointer" />
                                            </PopoverTrigger>
                                            <PopoverContent className="space-y-4 p-4 w-fit text-[11px] md:text-xs xl:text-sm">
                                                <p className="mb-2">Update Status</p>
                                                <button onClick={() => handleStatus(tx._id, "successful")} className="flex items-center gap-1 bg-green-100 hover:bg-green-200 px-2 py-0.5 rounded w-full text-green-600 text-left">
                                                    <CircleCheck className="size-4" /> Successful
                                                </button>
                                                <button onClick={() => handleStatus(tx._id, "pending")} className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 px-2 py-0.5 rounded w-full text-yellow-600 text-left">
                                                    <ClockFading className="size-4" /> Pending
                                                </button>
                                                <button onClick={() => handleStatus(tx._id, "reversed")} className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded w-full text-blue-600 text-left">
                                                    <Undo2 className="size-4" /> Reversed
                                                </button>
                                                <button onClick={() => handleStatus(tx._id, "failed")} className="flex items-center gap-1 bg-red-100 hover:bg-red-100 px-2 py-0.5 rounded w-full text-red-600 text-left">
                                                    <X className="size-4" /> Failed
                                                </button>
                                                <button onClick={() => handleStatus(tx._id, "disputed")} className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded w-full text-amber-600 text-left">
                                                    <CirclePause className="size-4" /> Disputed
                                                </button>
                                            </PopoverContent>
                                        </Popover>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
        </>
    );
}

export default Table;