import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { Home2, ArrowSwapVertical, Profile, Add, Headphone, Card, MoneyRecive, CloseCircle, Bank, LogoutCurve } from "iconsax-react";

const mainNavItems = [
    { id: "home", label: "Home", icon: Home2, href: "/user/dashboard" },
    { id: "history", label: "History", icon: ArrowSwapVertical, href: "/user/history" },
    { id: "profile", label: "Profile", icon: Profile, href: "/user/profile" },
    { id: "support", label: "Support", icon: Headphone, href: "/user/support" },
]

const plusMenuItems = [
    { id: "savings", label: "Savings", icon: Bank, href: "/user/savings" },
    { id: "loan", label: "Loan", icon: MoneyRecive, href: "/user/loan" },
    { id: "cards", label: "Cards", icon: Card, href: "/user/cards" },
    { id: "logout", label: "Logout", icon: LogoutCurve, href: "/user/logout" },
]

export default function BottomNavigation() {

    const [activeTab, setActiveTab] = useState("home");
    const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
    const path = useLocation().pathname;

    //Functions
    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId)
        if (isPlusMenuOpen) {
            setIsPlusMenuOpen(false)
        }
    }

    const handlePlusClick = () => {
        setIsPlusMenuOpen(!isPlusMenuOpen)
        if (!isPlusMenuOpen) {
            setActiveTab("plus")
        }
    }

    const handlePlusMenuItemClick = (itemId: string) => {
        setActiveTab(itemId)
        setIsPlusMenuOpen(false)
    }

    return (
        <div className="lg:hidden bottom-0 left-0 z-50 fixed flex justify-center items-end bg-neutral-100 p-2 border-neutral-200 border-t w-full">
            <div className="relative">
                <AnimatePresence>
                    {isPlusMenuOpen && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}
                            className="right-0 bottom-20 absolute bg-white shadow-2xl p-2 border border-gray-200 rounded-2xl min-w-[160px]">
                            {plusMenuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                const isActive = path === item.href;
                                return (
                                    <Link to={item.href} key={item.id}><motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} onClick={() => handlePlusMenuItemClick(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-50"
                                            }`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.98 }}>
                                        <IconComponent size={20} variant={isActive ? "Bold" : "Outline"} />
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </motion.button></Link>
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-x-0.5 sm:gap-x-2">

                    <motion.div className="flex items-center space-x-1 bg-black px-2 py-2 rounded-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        {mainNavItems.map((item) => {
                            const IconComponent = item.icon
                            const isActive = activeTab === item.id

                            return (
                                <Link to={item.href} key={item.id}><motion.button onClick={() => handleTabClick(item.id)}
                                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all duration-300 ${isActive ? "bg-white text-primary" : "text-white hover:text-gray-300"
                                        }`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <IconComponent size={20} variant={isActive ? "Bold" : "Outline"} />
                                    {isActive && (
                                        <motion.span className="font-medium text-sm" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}>
                                            {item.label}
                                        </motion.span>
                                    )}
                                </motion.button></Link>
                            )
                        })}
                    </motion.div>

                    <motion.button onClick={handlePlusClick} className={`size-12 rounded-full flex items-center justify-center transition-all duration-300 ${activeTab === "plus" || isPlusMenuOpen ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-black text-white hover:bg-gray-800"}`}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <motion.div animate={{ rotate: isPlusMenuOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                            {isPlusMenuOpen ? <CloseCircle size={24} className="rotate-45" variant="Bold" /> : <Add size={24} variant="Bold" />}
                        </motion.div>
                    </motion.button>
                </div>

            </div>
        </div>
    )
}
