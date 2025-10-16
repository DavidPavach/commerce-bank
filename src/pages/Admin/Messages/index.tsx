import { useEffect, useRef, useState } from "react";
import { toast } from "react-fox-toast";

//Stores, Utils and Services
import { useChatStore } from "@/stores/message.store";
import { formatDate, formatLastSession, getInitials } from "@/utils/format";
import { resendMessage, sendMessage, deleteMessage, startTyping, stopTyping, markMessagesAsRead } from "@/services/sockets/socketService";

//Components
import Pin from "./Pin";
import Header from "./Header";
import ChatHeader from "./ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typing from "./Typing";

//Icons
import { CheckCheck, ClockFading, MessageSquare, RotateCcw } from "lucide-react";
import { MessageRemove, Send, Send2, Trash } from "iconsax-react";


const Index = () => {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [message, setMessage] = useState<string>("");
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    //Message Store
    const { conversations, activeUser, activeConversationId, selfId, typingUsers, setActiveConversation, setActiveUser } = useChatStore();

    //Constants
    const toggleAuthorization = () => setIsAuthorized(true);
    const messages = conversations?.find(c => c.userId === activeConversationId)?.messages || [];

    //Functions
    useEffect(() => {
        const el = lastMessageRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            try {
                el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                if (selfId && activeConversationId) {
                    markMessagesAsRead(selfId, activeConversationId)
                }
            } catch {
                (el as HTMLDivElement).scrollIntoView();
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages.length]);

    const handleSelectUser = (conv: Conversation) => {
        //Set active user and preview
        setActiveConversation(conv.userId);
        if (conv.userPreview) {
            setActiveUser(conv.userPreview);
        }

        //Mark messages as read
        if (selfId !== null) {
            markMessagesAsRead(selfId, conv.userId)
        }
    }

    const handleTyping = (text: string, from: string, to: string) => {

        setMessage(text)

        // Emit "typing: true" immediately when the user starts typing
        startTyping(from, to)

        // Clear previous timeout
        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        // After 2s of no typing, emit stop typing
        typingTimeout.current = setTimeout(() => {
            stopTyping(from, to)
        }, 2000);
    };

    const handleSendMessage = () => {
        if (message.trim() && selfId !== null && activeConversationId !== null) {
            sendMessage(selfId, activeConversationId, message, (res) => {
                if (!res.success) {
                    toast.error("Message Failed to Send");
                } else {
                    toast.success("Message Sent")
                }
            })
            setMessage("");
        }
    };

    const handleDeleteMessage = (message: Message) => {

        const proceed = confirm("Delete Message?");
        if (!proceed) return toast.error("Deletion was cancelled");

        deleteMessage(message.id, message.from, message.to, (res) => {
            if (!res.success) {
                toast.error("Message Deletion Failed");
            } else {
                toast.success("Message Deleted")
            }
        })
    }


    return (
        <>
            {!isAuthorized && <Pin authorize={toggleAuthorization} />}
            {isAuthorized && (
                <main className="md:flex flex-1 bg-white rounded-2xl h-[80vh]">
                    {/* Sidebar */}
                    <section className={`${activeUser !== null && "hidden md:block"} overflow-y-auto w-full md:w-[40%] lg:w-[35%] xl:w-[30%] md:border-r md:border-neutral-200 flex flex-col relative`}>
                        {/* Conversation Header */}
                        <Header />

                        {/* Conversation List */}
                        {conversations.map(conv => {

                            const lastMessage = conv.messages[conv.messages.length - 1]?.text;
                            const lastMessageTimestamp = conv.messages[conv.messages.length - 1]?.timestamp;
                            const isTyping = typingUsers[conv.userId];

                            return (
                                <button key={conv.userId} onClick={() => handleSelectUser(conv)}
                                    className={`w-full p-4 flex items-start gap-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 ${activeConversationId === conv.userId ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}>
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <Avatar className="size-12">
                                            <AvatarImage src={conv.userPreview?.profilePicture} alt={conv.userPreview?.fullName} />
                                            <AvatarFallback>{getInitials(conv.userPreview?.fullName ?? "Unknown")}</AvatarFallback>
                                        </Avatar>
                                        {conv.userPreview?.isOnline && (
                                            <div className="right-0 bottom-0 absolute bg-primary border-2 border-white rounded-full w-3.5 h-3.5"></div>
                                        )}
                                    </div>

                                    {/* Chat Info */}
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold text-lightBlack text-sm md:text-base xl:text-lg truncate capitalize">{conv.userPreview?.fullName}</h3>
                                            <span className="flex-shrink-0 ml-2 text-neutral-500 text-xs">{formatLastSession(new Date(lastMessageTimestamp))}</span>
                                        </div>
                                        {isTyping ? <Typing fullName="" /> : <p className="text-neutral-600 text-sm truncate">{lastMessage}</p>}
                                    </div>

                                    {/* Unread Badge */}
                                    {conv.unreadCount > 0 && (
                                        <div className="flex flex-shrink-0 justify-center items-center bg-accent rounded-full w-6 h-6">
                                            <span className="font-bold text-white text-xs">{conv.unreadCount}</span>
                                        </div>
                                    )}
                                </button>
                            )
                        })}

                    </section>

                    {/* Chat Section */}
                    <section className={`${activeUser === null && "hidden md:block"} relative md:w-[60%] lg:w-[65%] xl:w-[70%] flex flex-col h-full`}>
                        {activeUser === null ? (
                            <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                                <div className="text-center">
                                    <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent mx-auto mb-4 rounded-full size-20 xl:size-24">
                                        <MessageSquare className="size-10 xl:size-12 text-white" />
                                    </div>
                                    <h2 className="mb-2 font-bold text-lightBlack text-xl xl:text-2xl">
                                        Select a conversation
                                    </h2>
                                    <p className="text-neutral-500">
                                        Select a user from the sidebar to start messaging
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <main className="flex flex-col flex-1 overflow-y-auto">
                                {/* Chat Header */}
                                <ChatHeader />

                                {/* Scrollable Chat Area */}
                                <ScrollArea className="relative flex-1 bg-neutral-50 p-4">
                                    <div className="flex flex-col gap-4 overflow-y-auto">
                                        <div className="flex justify-center">
                                            <div className="bg-neutral-100 px-3 py-1 rounded-lg text-[11px] text-neutral-500 md:text-xs xl:text-sm capitalize">
                                                Chat started with {activeUser.fullName}
                                            </div>
                                        </div>
                                        {messages.length > 0 ? messages.map((message, idx) => {
                                            const isLast = idx === messages.length - 1;
                                            return (
                                                <div key={message.id} ref={isLast ? lastMessageRef : undefined} className={`flex ${message.from === selfId ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-xl px-4 py-2.5 rounded-2xl ${message.from === selfId
                                                        ? 'bg-primary text-white rounded-br-sm'
                                                        : 'bg-white text-lightBlack rounded-bl-sm shadow-sm border border-neutral-100'
                                                        }`}>
                                                        <p className="text-sm leading-tight">{message.text}</p>
                                                        <div className="flex justify-end items-center gap-x-3">
                                                            {message.from === selfId && <Trash variant="Bold" className="size-4 hover:text-primaryYellow duration-300 cursor-pointer" onClick={() => handleDeleteMessage(message)} />}
                                                            <p className={`text-[10px] md:text-[11px] xl:text-xs mt-1 ${message.from === selfId ? 'text-primaryYellow' : 'text-green-600'}`}>
                                                                {formatDate(message.timestamp)}
                                                            </p>
                                                            <p>
                                                                {message.status === "pending" ?
                                                                    <ClockFading className="size-4 md:size-5 text-yellow-500 xl:text-6" />
                                                                    : message.status === "failed" ? <RotateCcw className="bg-red-500 p-0.5 size-4 md:size-5 text-red-100 xl:text-6 cursor-pointer" onClick={() => resendMessage(message)} />
                                                                        : <CheckCheck className={`size-4 md:size-5 xl:text-6 ${message.from === selfId ? 'text-primaryYellow' : 'text-green-600'}`} />
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                            <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                                                <div className="text-center">
                                                    <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent mx-auto mb-4 rounded-full size-20 xl:size-24">
                                                        <MessageRemove className="size-10 xl:size-12 text-white" />
                                                    </div>
                                                    <h2 className="mb-2 font-bold text-lightBlack text-xl xl:text-2xl">
                                                        No Messages Yet
                                                    </h2>
                                                    <p className="text-neutral-500">
                                                        Kindly send the first message
                                                    </p>
                                                </div>
                                            </div>}
                                        {activeConversationId !== null && typingUsers[activeConversationId] && <Typing fullName={activeUser.fullName} />}
                                    </div>
                                </ScrollArea>

                                {/* Input Area */}
                                <div className="p-4 border-t">
                                    <div className="flex gap-2">
                                        <Input placeholder="Type a message..." value={message} onChange={(e) => handleTyping(e.target.value, selfId || "", activeConversationId || "")}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault(); handleSendMessage()
                                                }
                                            }}
                                            className="flex-1" autoFocus />
                                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                                            {message.trim().length > 0 ? (
                                                <Send2 className="size-4 text-white cursor-pointer" />
                                            ) : (
                                                <Send className="size-4 text-white cursor-pointer" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </main>
                        )}
                    </section>
                </main>
            )}
        </>
    );
};

export default Index;