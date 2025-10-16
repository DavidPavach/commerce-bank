import { NavLink, useLocation } from "react-router-dom";

const NavItem = ({ href, icon: Icon, label }: NavItem) => {
    const isActive = useLocation().pathname === href;

    return (
        <NavLink to={href} className={`${isActive ? "p-2 rounded-[2rem] bg-[#F0F0F0] text-black" : "text-gray-600"} text-sm md:text-base flex gap-x-1 items-center w-auto duration-300`}>
            <Icon size="24" color={isActive ? "#F97316" : "#6E6E6E"} variant={isActive ? "Bold" : "Outline"} />
            {isActive && <p className="font-semibold">{label}</p>}
        </NavLink>
    );
};

export default NavItem;