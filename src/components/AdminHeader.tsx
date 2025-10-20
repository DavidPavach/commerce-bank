import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

//Utils
import { clearAdminTokens } from "@/lib/token";

//Images
import logo from "/logo.png"

//Icons
import { X, LogOut, ChevronDown } from 'lucide-react';
import { Category, UserTag, Activity, Messages2, MoneyRecive, Bank } from "iconsax-react";

const AdminHeader = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close dropdown on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    };

    const handleLogOut = () => {
        toast.info("Logging you out...")
        clearAdminTokens();
        setTimeout(() => navigate("/operations"), 1000)
    }

    const handleMenuClick = (action: string) => {
        setIsDropdownOpen(false)

        // Handle different menu actions
        switch (action) {
            case "savings":
                navigate(`/admin/savings`);
                break
            case "deposits":
                navigate(`/admin/deposits`);
                break
            case "messages":
                navigate(`/admin/messages`);
                break
            case "activities":
                navigate(`/admin/activities`);
                break
            case "profile":
                navigate(`/admin/profile`);
                break
            case "logout":
                handleLogOut();
                break
            default:
                
                break
        }
    }

    const menuItems = [
         {
            id: "savings",
            label: "Savings",
            icon: <Bank size={18} />,
            action: () => handleMenuClick("savings"),
        },
        {
            id: "deposit",
            label: "Deposits",
            icon: <MoneyRecive size={18} />,
            action: () => handleMenuClick("deposits"),
        },
        {
            id: "messages",
            label: "Messages",
            icon: <Messages2 size={18} />,
            action: () => handleMenuClick("messages"),
        },
        {
            id: "activities",
            label: "Activities",
            icon: <Activity size={18} />,
            action: () => handleMenuClick("activities"),
        },
        {
            id: "profile",
            label: "Profile",
            icon: <UserTag size={18} />,
            action: () => handleMenuClick("profile"),
        },
        {
            id: "logout",
            label: "Log Out",
            icon: <LogOut size={18} />,
            action: () => handleMenuClick("logout"),
            variant: "danger" as const,
        },
    ]

    return (
        <header className="relative flex justify-between items-center bg-black px-2 md:px-4 py-4 md:py-5 xl:py-6">
            <img src={logo} alt="Logo" className="bg-white p-1 rounded-lg size-12 xl:size-12" />
            <div className="relative">
                <button ref={buttonRef} onClick={toggleDropdown} className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors" aria-label="Open menu" aria-expanded={isDropdownOpen}>
                    <div className="flex justify-center items-center bg-white/10 rounded-full size-8">
                        <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            {isDropdownOpen ? (
                                <X size={18} className="text-white" />
                            ) : (
                                <Category size={18} className="text-white" />
                            )}
                        </motion.div>
                    </div>
                    <ChevronDown
                        size={16}
                        className={`text-white transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div ref={dropdownRef} initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.2 }} className="top-full right-0 z-50 absolute bg-white shadow-2xl mt-2 py-2 border border-gray-200 rounded-xl w-56">
                            {menuItems.map((item, index) => (
                                <motion.button key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: index * 0.05 }} onClick={item.action}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${item.variant === "danger"
                                        ? "text-red-600 hover:bg-red-50"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}>
                                    <div className={`${item.variant === "danger" ? "text-red-500" : "text-gray-500"
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-medium">{item.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default AdminHeader