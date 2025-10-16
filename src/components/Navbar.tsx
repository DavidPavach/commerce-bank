import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Stores
import { useUserStore } from "@/stores/userStore";
import { useChatStore } from "@/stores/message.store";

// Components
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { BellIcon } from "./BellIcon";

// Icons
import { Home2, ArrowSwapVertical, Profile, Headphone, Card, MoneyRecive, DeviceMessage } from "iconsax-react";

const mainNavItems = [
    { id: "home", label: "Home", icon: Home2, href: "/user/dashboard" },
    { id: "history", label: "History", icon: ArrowSwapVertical, href: "/user/history" },
    { id: "profile", label: "Profile", icon: Profile, href: "/user/profile" },
    { id: "support", label: "Support", icon: Headphone, href: "/user/support" },
    { id: "loan", label: "Loan", icon: MoneyRecive, href: "/user/loan" },
    { id: "cards", label: "Cards", icon: Card, href: "/user/cards" },
];

const Navbar = () => {

    const { user, refetchUserData } = useUserStore();
    const { conversations } = useChatStore();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            refetchUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    return (
        <nav className="flex justify-between items-center p-4">
            <div className="relative flex gap-x-2 font-medium text-base md:text-lg xl:text-xl">
                Hi, <span className="capitalize">{user?.fullName && user.fullName.trim().split(/\s+/)[0]}</span>
                <DeviceMessage variant="Bulk" className={`text-primaryYellow ${conversations.length > 0 && "animate-shakeSlow"} `} />
                {conversations.length > 0 && (
                    <span className="-top-1 -right-1 absolute bg-red-500 px-1 rounded-full text-white text-xs">
                        {conversations[0]?.unreadCount}
                    </span>
                )}
            </div>

            <main className="flex items-center gap-x-5">
                <div className="hidden lg:flex gap-x-3 bg-neutral-100 p-2 px-4 border border-neutral-200 rounded-3xl text-black">
                    {mainNavItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link key={item.id} to={item.href}
                                className={`flex items-center gap-1 px-3 py-2 rounded-3xl text-sm md:text-base transition-colors ${isActive
                                    ? "bg-primary text-neutral-100" : "hover:bg-neutral-200"}`}>
                                <Icon size={18} variant="Bold" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <section className="flex items-center gap-x-3">
                    <div className="place-content-center grid bg-neutral-100 rounded-full size-10 md:size-12 xl:size-14">
                        <BellIcon />
                    </div>
                    <Avatar className="bg-neutral-100 p-1 md:p-1.5 xl:p-2 border border-neutral-200 size-10 md:size-12 xl:size-14">
                        <AvatarImage src={user?.profilePicture} alt={user?.fullName} className="rounded-[50%]" />
                        <AvatarFallback className="bg-primary/20 text-primary text-sm md:text-base xl:text-lg">
                            {user?.fullName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </section>
            </main>
        </nav>
    );
};

export default Navbar;
