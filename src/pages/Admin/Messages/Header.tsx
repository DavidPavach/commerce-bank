import { useEffect, useState } from "react";

//Stores, Utils and Services
import { useChatStore } from "@/stores/message.store";
import { getInitials } from "@/utils/format";
import { GetAllUsers } from "@/services/queries.service";
import { usePageParam } from "@/Hooks/PageParams";
import { fetchAllConversations } from "@/services/sockets/socketService";

//Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import PaginationControls from "@/components/Pagination";

//Icons
import { Loader, MessageSquare, MessageSquarePlus, RefreshCcw, Search } from "lucide-react";

const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { page, setPage } = usePageParam();
    const { data, isFetching, isLoading, isError, refetch } = GetAllUsers(page.toString(), "100");

    const users = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    //Message Store
    const { conversations, setActiveConversation, setActiveUser, selfId } = useChatStore();

    useEffect(() => {
        if (!conversations) {
            fetchAllConversations(selfId || "", true)
        }
    }, [conversations, selfId])

    //Functions
    const filteredUsers: User[] = users.filter(
        (user: User) =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.accountNumber.includes(searchQuery),
    )

    const handleSelectUser = (user: User) => {
        setActiveConversation(user._id)
        const conv = conversations.find(c => c.userId === user._id);
        if (!conv || !conv.userPreview) {
            const userData = {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                profilePicture: user.profilePicture,
                lastSession: user.lastSession,
                isOnline: user.isOnline,
                isSuspended: user.isSuspended,
                isFullyVerified: user.isFullyVerified
            }
            setActiveUser(userData)
        } else {
            setActiveUser(conv.userPreview);
        }
        setIsDialogOpen(false)
        setSearchQuery("")
    }

    return (
        <div className="bg-gradient-to-br from-primary to-accent px-4 py-5 border-neutral-200 border-b rounded-tl-xl">
            <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-2 font-semibold text-white text-lg md:text-xl xl:text-2xl">
                    <MessageSquare className="size-5 md:size-6 xl:size-7" />
                    Chats
                </h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    {(isFetching || isLoading) ? <Loader className="animate-spin" /> : isError ? <Button onClick={() => refetch()}><RefreshCcw className="bg-black hover:bg-neutral-800 mr-2 size-4 text-white duration-300" />
                        Refresh</Button> : <DialogTrigger asChild>
                        <Button className="bg-black hover:bg-neutral-800 text-white duration-300">
                            <MessageSquarePlus className="mr-2 lg:mr-0 2xl:mr-2 size-4" />
                            <span className="lg:hidden 2xl:block">New Chat</span>
                        </Button>
                    </DialogTrigger>}
                    <DialogContent className="rounded-2xl max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Start a New Chat</DialogTitle>
                            <DialogDescription>Search and select a user to start a conversation</DialogDescription>
                        </DialogHeader>

                        {/* Search Input */}
                        <div className="relative">
                            <Search className="top-1/2 left-3 absolute size-4 text-neutral-500 -translate-y-1/2" />
                            <Input placeholder="Search by name, email, or account number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 text-xs md:text-sm xl:text-base" />
                        </div>

                        {/* User List */}
                        <ScrollArea className="h-[400px]">
                            <div className="space-y-2">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <button key={user._id} onClick={() => handleSelectUser(user)}
                                            className="flex items-center gap-3 hover:bg-neutral-100 p-3 border rounded-lg w-full text-left transition-colors">
                                            <Avatar className="size-12">
                                                <AvatarImage src={user.profilePicture} alt={user.fullName} />
                                                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-xs md:text-sm xl:text-base capitalize">{user.fullName}</p>
                                                    {user.isOnline && <span className="bg-green-500 rounded-full size-2" />}
                                                    {user.isFullyVerified ?
                                                        <Badge variant="secondary" className="h-5 text-[10px] md:text-[11px] xl:text-xs">
                                                            Verified
                                                        </Badge> :
                                                        <Badge variant="destructive" className="h-5 text-[10px] md:text-[11px] xl:text-xs">
                                                            Unverified
                                                        </Badge>
                                                    }
                                                </div>
                                                <div>
                                                    <p className="text-[11px] text-neutral-700 md:text-xs xl:text-sm first-letter:uppercase">{user.email}</p>
                                                    <p className="text-[10px] text-neutral-500 md:text-[11px] xl:text-xs">Account: {user.accountNumber}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="py-8 text-neutral-500 text-center">No users found matching your search</div>
                                )}
                            </div>
                        </ScrollArea>
                        {totalPages > 1 && (
                            <div className="mt-4">
                                <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Header;