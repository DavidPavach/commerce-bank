import { toast } from "react-fox-toast";

//Stores, Utils and Services
import { useChatStore } from "@/stores/message.store";
import { formatLastSession, getInitials } from "@/utils/format";
import { logoutUser } from "@/services/sockets/socketService";

//Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

//Icons
import { Logout, More } from "iconsax-react";

const ChatHeader = () => {

    //Message Store
    const { activeUser, setActiveUser, setActiveConversation } = useChatStore();

    if (activeUser === null) return;

    const handleLogout = () => {

        const proceed = confirm("Suspend User?");
        if (!proceed) return toast.error("Suspension was cancelled");

        logoutUser(activeUser._id, (res) => {
            if (!res.success) {
                toast.error("Failed to logout user");
            } else {
                toast.success("User was logged out successfully")
            }
        })
    }
    return (
        <main className="bg-white shadow-sm p-3.5 lg:p-3 2xl:p-4 border-neutral-200 border-b rounded-t-xl">
            <section className="flex items-center gap-3">
                <div className="relative">
                    <Avatar className="size-12">
                        <AvatarImage src={activeUser.profilePicture} alt={activeUser.fullName} />
                        <AvatarFallback>{getInitials(activeUser.fullName)}</AvatarFallback>
                    </Avatar>
                    {activeUser.isOnline && (
                        <div className="right-0 bottom-0 absolute bg-primary border-2 border-white rounded-full size-3"></div>
                    )}
                </div>
                <section className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-lightBlack text-sm md:text-base xl:text-lg capitalize outfit">{activeUser.fullName}</h2>
                            <p className="md:-mt-1 text-[11px] text-neutral-500 md:text-xs xl:text-sm">
                                {activeUser.isOnline ? 'Online' : activeUser.lastSession ? formatLastSession(activeUser.lastSession) : "Offline"}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 md:gap-x-3 xl:gap-x-5">
                            {activeUser.isFullyVerified ?
                                <Badge variant="secondary" className="h-5 text-[10px] md:text-[11px] xl:text-xs">
                                    Verified
                                </Badge> :
                                <Badge variant="destructive" className="h-5 text-[10px] md:text-[11px] xl:text-xs">
                                    Unverified
                                </Badge>
                            }
                            <Popover>
                                <PopoverTrigger asChild>
                                    <More variant="Bold" className="size-6 cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent className="space-y-4 p-4 w-fit text-neutral-100 text-xs md:text-sm">
                                    <button className="px-3 py-1 border border-primary rounded-xl w-full text-primary text-center capitalize" onClick={() => { setActiveUser(null); setActiveConversation(""); }}>
                                        Close ❎
                                    </button>
                                    <button onClick={handleLogout} className="flex items-center gap-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-xl w-full text-center">
                                        <Logout className="size-4" /> <span>Logout User</span>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>

                </section>
            </section>
        </main>
    );
}

export default ChatHeader;