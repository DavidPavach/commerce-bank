import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

//Utils
import { clearAdminTokens } from "@/lib/token";

//Components
import SideItem from "./SideBarItem";

//Icons
import { Profile2User, MoneyChange, Key, UserTag, CardReceive, Logout, Bank, Activity, SecurityUser } from "iconsax-react";

const navItems = [
    { href: "/admin/transactions", icon: MoneyChange, label: "Transactions" },
    { href: "/admin/users", icon: Profile2User, label: "Users" },
    { href: "/admin/accounts", icon: UserTag, label: "Accounts" },
    { href: "/admin/card", icon: CardReceive, label: "Card Request" },
    { href: "/admin/admins", icon: Key, label: "Staff" },
    { href: "/admin/savings", icon: Bank, label: "Savings" },
    { href: "/admin/activities", icon: Activity, label: "Activities" },
    { href: "/admin/profile", icon: SecurityUser, label: "Profile" },
];



const logoutItem = { icon: Logout, label: "Logout" };

const AdminSideBar = () => {

    const navigate = useNavigate();

    //Functions
    const handleLogOut = () => {
        toast.info("Logging you out...")
        clearAdminTokens();
        setTimeout(() => navigate("/operations"), 1000)
    }

    return (
        <main className="hidden fixed lg:flex flex-col bg-[#000000] px-10 py-6 w-[20rem] h-dvh text-[#c8c8c9]">
            <div className="flex flex-col flex-grow gap-y-8 mt-20">
                {navItems.map((item, index) => (
                    <SideItem key={`items-${index}`} {...item} />
                ))}
            </div>
            <div className="mt-8" onClick={handleLogOut}>
                <SideItem href="" {...logoutItem} />
            </div>
        </main>
    );
};

export default AdminSideBar;