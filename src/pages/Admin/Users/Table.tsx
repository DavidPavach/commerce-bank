import { useState } from "react";
import { toast } from "react-fox-toast";

//Hooks, Utils and Services
import { useAdminUserKyc } from "@/services/mutations.service";
import { formatDate } from "@/utils/format";
import { getColor } from "@/components/Utils";
import { suspendUser } from "@/services/sockets/socketService";

//Components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

//Icons
import { Clock, CloseCircle, DirectUp, Forbidden, ProfileTick, Unlock } from "iconsax-react";
import { Loader } from "lucide-react";

const Table = ({ users, handleViewMore }: { users: User[], handleViewMore: (user: User) => void }) => {

    const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
    const [pendingKyc, setPendingKyc] = useState<boolean>(false);
    const [data, setData] = useState<User[]>(users);

    //Functions
    const togglePending = () => {
        setPendingKyc((prev) => {
            const next = !prev;
            if (next) {
                const kycPendingUsers = users.filter(user => user.kyc && user.kyc.status === 'pending');
                setData(kycPendingUsers);
            } else {
                setData(users);
            }
            return next;
        });
    };

    const updateKyc = useAdminUserKyc()
    const handleKyc = (email: string, status: "accepted" | "pending" | "rejected") => {

        setLoadingEmail(email);
        updateKyc.mutate({ email, kyc: { status: status } }, {
            onSuccess: (response) => {
                toast.success(response.message || "The user KYC status was updated successfully!");
                setLoadingEmail(null)
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't update suspension status, kindly try again.";
                toast.error(message);
                setLoadingEmail(null)
            }
        })
    }

    const handleSuspension = (id: string, email: string, status: boolean) => {

        const proceed = confirm(`${status ? "Suspend User?" : "Restore User?"}`);
        if (!proceed) return toast.error("Action was cancelled");

        suspendUser(id, email, status, (res) => {
            if (!res.success) {
                toast.error("Failed to suspend user");
            } else {
                toast.success("User was suspended successfully");
                window.location.reload()
            }
        })
    }

    return (
        <div className="mt-2 w-full overflow-x-auto">
            <div onClick={togglePending} className={`my-4 text-[10px] md:text-xs xl:text-sm ${pendingKyc ? "bg-primary text-white" : "bg-neutral-600 text-white"} cursor-pointer w-fit rounded-xl px-2 py-1`}>
                Pending KYC
            </div>
            <table className="bg-lightBlack rounded-xl min-w-full overflow-hidden text-white text-nowrap">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 font-medium text-sm text-left">S/N</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Profile</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Acc. Number</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Country</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Gender</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Ph. Num.</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Password</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Is Online</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Verified?</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Suspended?</th>
                        <th className="px-4 py-3 font-medium text-sm text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-6 text-sm text-center">
                                No Users found.
                            </td>
                        </tr>
                    ) : (data.map((user, index) => (
                        <tr key={user._id} className="border-gray-700 border-b">
                            <th className="px-4 py-3">{index + 1}</th>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    {user.profilePicture ? <img src={user.profilePicture} alt="profile" className="rounded-full size-6 md:size-7 xl:size-8 shrink-0" /> : <div className="flex justify-center items-center bg-gray-200 rounded-full size-6 md:size-7 xl:size-8 font-bold text-primary uppercase">
                                        {user.fullName.slice(0, 2)}</div>}
                                    <div>
                                        <p className="text-sm capitalize">{user.fullName}</p>
                                        <p className="text-gray-400 text-xs first-letter:uppercase">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3">{user.accountNumber}</td>
                            <td className="px-4 py-3">{user.country}</td>
                            <td className="px-4 py-3 uppercase">{user.gender}</td>
                            <td className="px-4 py-3 capitalize">{user.phoneNumber}</td>
                            <td className="px-4 py-3">{user.encryptedPassword}</td>
                            <td className="px-4 py-3">{user.isOnline ? "Yes✅" : "No❌"}</td>
                            <td className="px-4 py-3">{user.isVerified ? "Yes✅" : "No❌"}</td>
                            <td className="px-4 py-3">{user.isSuspended ? "Yes✅" : "No❌"}</td>
                            <td className="flex justify-between items-center gap-x-5 px-4 py-3">
                                {loadingEmail === user.email ? (
                                    <Loader className="size-4 md:size-5 xl:size-6 animate-spin" />
                                ) : (
                                    <span className="size-6 duration-300 cursor-pointer" onClick={() => handleSuspension(user._id, user.email, !user.isSuspended)}>
                                        {user.isSuspended ? <Unlock variant="Bold" className="text-green-400 hover:text-green-600" /> : <Forbidden variant="Bold" className="text-red-400 hover:text-red-600" />}
                                    </span>
                                )}
                                <button onClick={() => handleViewMore(user)}>
                                    <DirectUp variant="Bold" size={18} className="text-blue-400 hover:text-blue-600 duration-300" /></button>
                                <div>
                                    {loadingEmail === user.email ? (
                                        <svg className="mt-1 size-4 animate-spin" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z" />
                                        </svg>
                                    ) : (
                                        <Popover>
                                            <PopoverTrigger className="bg-green-600 px-2 py-0.5 rounded-lg text-xs">View</PopoverTrigger>
                                            <PopoverContent className="bg-black border border-gray-700 w-80">
                                                <div className="flex gap-x-5">
                                                    <Button variant="secondary" size="icon" className="bg-neutral-900 size-8" onClick={() => handleKyc(user.email, "pending")} disabled={loadingEmail === user.email}>
                                                        <Clock variant="Bold" className="text-yellow-500 hover:text-yellow-700 duration-300" />
                                                    </Button>
                                                    <Button variant="secondary" size="icon" className="bg-neutral-900 size-8" onClick={() => handleKyc(user.email, "accepted")} disabled={loadingEmail === user.email}>
                                                        <ProfileTick variant="Bold" className="text-green-500 hover:text-green-700 duration-300" />
                                                    </Button>
                                                    <Button variant="secondary" size="icon" className="bg-neutral-900 size-8" onClick={() => handleKyc(user.email, "rejected")} disabled={loadingEmail === user.email}>
                                                        <CloseCircle variant="Bold" className="text-red-400 hover:text-red-600 duration-300" />
                                                    </Button>
                                                </div>
                                                <div className="flex flex-col gap-y-2 mt-2">
                                                    <div className="flex gap-x-2">
                                                        {user.kyc?.images?.map((image) => (
                                                            <img className="border border-neutral-300 rounded-lg w-1/2 h-40" key={image} src={image} alt="KYC Images" />
                                                        ))}
                                                    </div>
                                                    <div className="space-y-1 mt-2 text-neutral-100 text-xs capitalize">
                                                        <p className={`${getColor(user.kyc?.status ?? "pending")} px-2 py-0.5 w-fit rounded-lg`}>{user.kyc?.status}</p>
                                                        <p>{user.kyc?.idType}</p>
                                                        <p>{user.kyc && formatDate(user.kyc?.lastSubmissionDate)}</p>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}

                                </div>
                            </td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;