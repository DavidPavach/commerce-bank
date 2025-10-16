import { useEffect, useRef, useState } from "react";
import { toast } from "react-fox-toast";

//Stores and Utils
import { useChatStore } from "@/stores/message.store";
import { formatDate } from "@/utils/format";
import { markMessagesAsRead, resendMessage, sendMessage, startTyping, stopTyping } from "@/services/sockets/socketService";

//Components
import Header from "./Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typing from "./Typing";

//Icons and Images
import { I24Support, MessageRemove, Send, Send2 } from "iconsax-react";
import { CheckCheck, ClockFading, RotateCcw } from "lucide-react";
import supportImg from "/support.jpg";

const Index = () => {

    const [message, setMessage] = useState<string>("");
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    //Variables
    const ADMIN_CONNECT = import.meta.env.VITE_ADMIN_ID;

    //Stores
    const { conversations, selfId, typingUsers } = useChatStore();

    //Constants
    const messages: Message[] = conversations[0]?.messages || [];

    //Functions

    useEffect(() => {
        const el = lastMessageRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            try {
                el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                if (selfId) {
                    markMessagesAsRead(selfId, ADMIN_CONNECT)
                }
            } catch {
                (el as HTMLDivElement).scrollIntoView();
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages.length]);

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
        if (message.trim() && selfId !== null) {
            sendMessage(selfId, ADMIN_CONNECT, message, (res) => {
                if (!res.success) {
                    toast.error("Message Failed to Send");
                } else {
                    toast.success("Message Sent")
                }
            })
            setMessage("");
        }
    };

    return (
        <main className="flex flex-col gap-y-5 bg-white p-2 sm:p-3 md:p-6 xl:p-8 rounded-3xl h-[85vh]">
            <h1 className="flex items-center gap-1 mt-2 font-semibold text-black text-lg md:text-xl xl:text-2xl">
                <I24Support className="size-6 md:size-7 xl:size-8" variant="Bulk" />
                Your Banking Buddy
            </h1>
            <section className="flex flex-col flex-1 gap-y-2 sm:gap-y-3 md:gap-y-4 xl:gap-y-5 bg-neutral-100 p-2 md:p-3 xl:p-4 rounded-xl overflow-y-auto">
                {/* Header */}
                <Header />

                <ScrollArea className="flex-1 bg-white p-4 rounded-xl">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center">
                            <div className="bg-neutral-100 px-3 py-1 rounded-lg text-[11px] text-neutral-500 md:text-xs xl:text-sm capitalize">
                                Chat started with your Banking Buddy
                            </div>
                        </div>
                        {messages.length > 0 ? messages.map((message, idx) => {
                            const isLast = idx === messages.length - 1;
                            return (
                                <div key={message.id} ref={isLast ? lastMessageRef : undefined} className={`flex ${message.from === selfId ? 'justify-end' : 'justify-start'}`}>
                                    {message.from !== selfId && <div className="relative mr-2 size-fit shrink-0">
                                        <img src={supportImg} alt="Banking Buddy Image" className="rounded-[50%] size-10 md:size-12 xl:size-14"></img>
                                        <div className="right-1 md:right-2 bottom-0 absolute bg-green-500 rounded-[50%] size-2 md:size-2.5" />
                                    </div>}
                                    <div className={`max-w-xl px-4 py-2.5 rounded-2xl ${message.from === selfId
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-neutral-50 text-lightBlack rounded-bl-sm shadow-sm border border-neutral-100'
                                        }`}>
                                        <p className="text-sm leading-tight">{message.text}</p>
                                        <div className="flex justify-end items-center gap-x-5">
                                            <p className={`text-[10px] md:text-[11px] xl:text-xs mt-1 ${message.from === selfId ? 'text-primaryYellow' : 'text-green-500'}`}>
                                                {formatDate(message.timestamp)}
                                            </p>
                                            <p>
                                                {message.status === "pending" ?
                                                    <ClockFading className="size-4 md:size-5 text-yellow-500 xl:text-6" />
                                                    : message.status === "failed" ? <RotateCcw className="bg-red-500 p-0.5 size-4 md:size-5 text-red-100 xl:text-6 cursor-pointer" onClick={() => resendMessage(message)} />
                                                        : <CheckCheck className={`size-4 md:size-5 xl:text-6 ${message.from === selfId ? 'text-primaryYellow' : 'text-green-500'}`} />
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
                                        No Messages
                                    </h2>
                                    <p className="text-neutral-500">
                                        Kindly send the first message
                                    </p>
                                </div>
                            </div>
                        }
                        {typingUsers[ADMIN_CONNECT] && <Typing />}
                    </div>
                </ScrollArea>
                {/* Input Area */}
                <div className="text-black">
                    <div className="flex gap-2">
                        <Input placeholder="Type a message..." value={message} onChange={(e) => handleTyping(e.target.value, selfId || "", ADMIN_CONNECT)}
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
            </section>
        </main>
    );
}

export default Index;