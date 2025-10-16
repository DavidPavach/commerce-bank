import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useDeleteAccount } from "@/services/mutations.service";

//Utils
import { formatDate } from "@/utils/format";

//Icons
import { Edit, Trash } from "iconsax-react";
import { Loader } from "lucide-react";

const Table = ({ accounts, handleViewMore }: { accounts: AccountDetails[], handleViewMore: (account: AccountDetails) => void; }) => {

    const [loadingAcc, setLoadingAcc] = useState<string>("")

    //Functions
    const deleteAccount = useDeleteAccount();
    const handleDelete = (accountId: string) => {

        const proceed = confirm("Delete Account");
        if (!proceed) return toast.error("Deletion was cancelled");
        setLoadingAcc(accountId);

        deleteAccount.mutate(accountId, {
            onSuccess: (response) => {
                toast.success(response.message || `Account was deleted successfully!`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || `Couldn't delete account, kindly try again.`;
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
                        <th>Account Name</th>
                        <th>Account Number</th>
                        <th>Bank Name</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                No Accounts found.
                            </td>
                        </tr>
                    ) : (accounts.map((account, index) => (
                        <tr key={account._id} className="[&>*]:px-4 [&>*]:py-3 border-gray-700 border-b">
                            <td>{index + 1}</td>
                            <td>{account.fullName}</td>
                            <td>{account.accountNumber}</td>
                            <td className="capitalize">{account.bankName}</td>
                            <td className="capitalize">{formatDate(account.createdAt)}</td>
                            <td className="flex gap-x-8">
                                {loadingAcc === account.accountNumber ? <Loader className="size-4 md:size-5 xl:size-6 text-blue-600 animate-spin" /> : <Trash onClick={() => handleDelete(account._id)} variant="Bold" className="size-4 md:size-5 xl:size-6 text-red-600 cursor-pointer" />}
                                <Edit onClick={() => handleViewMore(account)} variant="Bold" className="size-4 md:size-5 xl:size-6 text-green-600 cursor-pointer" />
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </main>
    );
}

export default Table;