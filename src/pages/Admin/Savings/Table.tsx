import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useAdminDeleteSavings } from "@/services/mutations.service";

//Utils
import { formatCurrency, formatDate, getProgressPercentage } from "@/utils/format";

//Component
import { getSavingsBadge } from "@/components/Utils";

//Icons
import { Loader } from "lucide-react";
import { Trash } from "iconsax-react";

const Table = ({ savings }: { savings: SavingsWithUser[] }) => {

    const [loadingSavings, setLoadingSavings] = useState<string>("")

    const deleteSavings = useAdminDeleteSavings();
    const handleDelete = (savingsId: string) => {

        const proceed = confirm("Delete Savings");
        if (!proceed) return toast.error("Deletion was cancelled");
        setLoadingSavings(savingsId);

        deleteSavings.mutate(savingsId, {
            onSuccess: (response) => {
                toast.success(response.message || `Savings was deleted successfully!`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't delete savings, kindly try again.`;
                toast.error(message);
            }
        })
    }

    return (
        <main className="w-full overflow-x-auto">
            <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white text-nowrap">
                <thead className="bg-gray-800">
                    <tr className="[&>*]:px-4 [&>*]:py-3 [&>*]:font-medium [&>*]:text-sm [&>*]:text-left">
                        <th>S/N</th>
                        <th>User</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Saved Amount</th>
                        <th>Target Amount</th>
                        <th>Progress</th>
                        <th>Interest Rate</th>
                        <th>Interest Earned</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {savings.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                No Savings found.
                            </td>
                        </tr>
                    ) : (
                        savings.map((saving, index) => (
                            <tr key={saving._id} className="[&>*]:px-4 py-3 [&>*]:py-3 border-gray-700 border-b">
                                <td>{index + 1}</td>
                                <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {saving.user.profilePicture ? <img src={saving.user.profilePicture} alt="profile" className="rounded-full size-6 md:size-7 xl:size-8 shrink-0" /> : <div className="flex justify-center items-center bg-gray-200 rounded-full size-6 md:size-7 xl:size-8 font-bold text-primary uppercase">
                                                {saving.user.fullName.slice(0, 2)}</div>}
                                            <div>
                                                <p className="text-sm capitalize">{saving.user.fullName}</p>
                                                <p className="text-gray-400 text-xs">{saving.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                <td>{saving.title}</td>
                                <td>{getSavingsBadge(saving.status)}</td>
                                <td className="uppercase">{formatCurrency(saving.savedAmount)}</td>
                                <td className="capitalize">{formatCurrency(saving.targetAmount || 0)}</td>
                                <td className="capitalize">
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-secondary rounded-[50%] size-2">
                                            <div className="bg-green-400 rounded-[50%] size-2 transition-all"
                                                style={{ width: `${getProgressPercentage(saving.savedAmount, saving.targetAmount ?? 0)}%` }} />
                                        </div>
                                        <span className="min-w-[3rem] text-muted-foreground text-sm">{getProgressPercentage(saving.savedAmount, saving.targetAmount ?? 0).toFixed(1)}%</span>
                                    </div>
                                </td>
                                <td>{saving.interestRate}</td>
                                <td>{formatCurrency(saving.totalInterestAccrued)}</td>
                                <td>{formatDate(saving.startDate)}</td>
                                <td>{saving.endDate && formatDate(saving.endDate)}</td>
                                <td>
                                    {loadingSavings === saving._id ? <Loader className="text-blue-600 animate-spin" /> : <Trash variant="Bold" className="text-red-600 cursor-pointer" onClick={() => handleDelete(saving._id)} />}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default Table;