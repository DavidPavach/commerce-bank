import { NavLink, useLocation } from "react-router-dom";

const SideItem = ({ href, icon: Icon, label }: NavItem) => {
    const isActive = useLocation().pathname === href;

    const baseClasses = "hover:bg-accent/30 duration-300";
    const activeClasses = "bg-[#F0F0F0] text-black";

    return (
        <NavLink to={href} className={`${isActive ? activeClasses : baseClasses} w-full rounded-[2rem] flex gap-x-2 py-3 px-6 items-center`}>
            <Icon size="24" variant={isActive ? "Bold" : "Outline"} color={isActive ? "#F97316" : "#c8c8c9"} />
            <p className="font-semibold">{label}</p>
        </NavLink>
    );
};

export default SideItem;