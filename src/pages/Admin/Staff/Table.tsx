import { useState } from "react";
import { toast } from "react-fox-toast";

//Utils and Services
import { formatDate } from "@/utils/format";
import { useEditAdmin } from "@/services/mutations.service";

//Components
import { getRoleBadge } from "@/components/Utils";

//Icons
import { Edit } from "iconsax-react";
import { BanIcon, Loader } from "lucide-react";

const Table = ({ admins, handleViewMore }: { admins: Admin[], handleViewMore: (admin: Admin) => void; }) => {

    const [runningAdmin, setRunningAdmin] = useState<string>("");

    const updateAdmin = useEditAdmin();
    const toggleSuspension = (adminId: string, isSuspended: boolean) => {

        setRunningAdmin(adminId);
        updateAdmin.mutate({ adminId, isSuspended: isSuspended ? false : true }, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Admin details was updated successfully!");
                setRunningAdmin("")
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update admin details, kindly try again later.";
                toast.error(message);
                setRunningAdmin("")
            },
        })
    }

    return (
        <main className="w-full overflow-x-auto">
            <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white text-nowrap">
                <thead className="bg-gray-800">
                    <tr className="[&>*]:px-4 [&>*]:py-3 [&>*]:font-medium [&>*]:text-sm [&>*]:text-left">
                        <th>S/N</th>
                        <th>Email Address</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Is Suspended</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                No Admin Account Found.
                            </td>
                        </tr>
                    ) : (admins.map((admin, index) => (
                        <tr key={admin._id} className="[&>*]:px-4 [&>*]:py-3 border-gray-700 border-b">
                            <td>{index + 1}</td>
                            <td>{admin.email}</td>
                            <td>{admin.encryptedPassword}</td>
                            <td>{getRoleBadge(admin.role)}</td>
                            <td className="text-center">{admin.isSuspended ? "Yes ✅" : "No ❌"}</td>
                            <td className="capitalize">{formatDate(admin.createdAt)}</td>
                            <td className="flex gap-x-5">
                                {runningAdmin === admin._id ? <Loader className="size-4 md:size-5 xl:size-6 text-blue-500 animate-spin" /> : <BanIcon onClick={() => toggleSuspension(admin.adminId, admin.isSuspended ?? false)} className="size-4 md:size-5 xl:size-6 text-accent cursor-pointer" />}
                                <Edit onClick={() => handleViewMore(admin)} variant="Bold" className="size-4 md:size-5 xl:size-6 text-green-600 cursor-pointer" />
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </main>
    );
}

export default Table;