import { useState, } from 'react';
import { AnimatePresence, motion } from "framer-motion";

//Stores and Utils
import { useNotificationStore } from '@/stores/notificationStore';
import { formatCurrency, formatDate } from '@/utils/format';

//Components
import { Badge } from './ui/badge';

//Icons
import { Clock, NotificationBing, Settings } from 'iconsax-react';
import { AlertTriangle, DollarSign, Info, TrendingDown, TrendingUp, X } from 'lucide-react';

export const BellIcon = () => {

    const [open, isOpen] = useState<boolean>(false);

    const { notifications, clearNotification } = useNotificationStore();

    const getNotificationIcon = (type: string, subtype?: string) => {
        switch (type.toLowerCase()) {
            case "transaction":
                switch (subtype?.toLowerCase()) {
                    case "credit":
                        return <TrendingUp className="w-5 h-5 text-green-500" />
                    case "debit":
                        return <TrendingDown className="w-5 h-5 text-red-500" />
                    default:
                        return <DollarSign className="w-5 h-5 text-[#1D9B5E]" />
                }
            case "system":
                return <Settings className="w-5 h-5 text-slate-500" />
            case "alert":
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />
            default:
                return <Info className="w-5 h-5 text-blue-500" />
        }
    }

    const getNotificationPriority = (type: string) => {
        if (type === "alert") return "high"
        if (type === "transaction" || type === "alert") return "medium"
        return "low"
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "border-l-red-500 bg-red-50/50"
            case "medium":
                return "border-l-yellow-500 bg-yellow-50/50"
            default:
                return "border-l-slate-300 bg-slate-50/50"
        }
    }

    //Functions
    const toggleOpen = () => isOpen((prev) => !prev);

    return (
        <div className="relative">
            <button className="relative" onClick={toggleOpen}>
                <NotificationBing variant='Bold' className={`text-primary ${notifications.length > 0 && "animate-shake"}`} />
                {notifications.length > 0 && (
                    <span className="-top-1 -right-1 absolute bg-red-500 px-1 rounded-full text-white text-xs">
                        {notifications.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="top-full -right-16 z-40 absolute bg-neutral-100 shadow-lg mt-2 px-2 py-4 border border-neutral-200 rounded-xl w-80 sm:w-96 md:w-[28rem] text-black">

                        <h4 className="mb-4 font-bold text-base md:text-lg xl:text-xl">Notifications <Badge className='rounded-2xl font-medium' variant="destructive">{notifications.length}</Badge></h4>
                        {notifications.length === 0 ? (
                            <p className="text-neutral-500">No new notifications</p>
                        ) : (
                            <ul className="space-y-2 max-h-[75vh] overflow-y-auto">
                                {notifications.map((n) => {

                                    const priority = getNotificationPriority(n.type)
                                    const priorityColor = getPriorityColor(priority)
                                    const Icon = getNotificationIcon(n.type, n.subtype)

                                    return (
                                        <motion.li key={n._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className={`relative flex items-start gap-3 px-3 py-4 border-l-4 border rounded-md hover:bg-slate-50 ${priorityColor}`}>
                                            <div className="flex-shrink-0 pt-1">
                                                {Icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-slate-900 text-sm md:text-base xl:text-lg capitalize">{n.title}</p>
                                                    <div className='flex items-center gap-x-0.5 text-neutral-700'>
                                                        <Clock className="size-3" />
                                                        <p className="text-[10px] md:text-xs xl:text-sm">{formatDate(n.createdAt)}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-neutral-800 text-sm">{n.message}</p>
                                                {(n.subtype === "credit" || n.subtype === "debit") &&
                                                    <div className={`flex gap-x-5 text-[11px] md:text-xs ${n.subtype === "credit" ? "text-green-600" : "text-red-600"}`}>
                                                        {n.data.amount && <p>Amount <span>{formatCurrency(n.data.amount)}</span></p>}
                                                        {n.data.balance && <p>Balance <span>{formatCurrency(n.data.balance)}</span></p>}
                                                    </div>
                                                }
                                            </div>
                                            <button onClick={() => clearNotification(n._id)} className="top-2 right-2 absolute text-neutral-500 hover:text-red-500 duration-200">
                                                <X size={14} />
                                            </button>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
