import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

//Icons
import { MessageQuestion, Category2, DollarCircle, ArrowRight } from "iconsax-react";

//images
import logo from "/logo1.png";
import currencyImg from "/currency_section.svg";
import heroIcon from "/hero_icons.svg";
import heroIcon1 from "/hero_icons1.svg";

// Navigation Links Configuration
const NAV_LINKS = [
    { path: "/", label: "HOME" },
    { path: "/company", label: "COMPANY" },
    { path: "/digital", label: "DIGITAL BANKING" },
    { path: "/user/dashboard", label: "MY ACCOUNT" },
];

// NavLink Component for consistent styling
const NavLink = ({ to, label, isActive }: { to: string; label: string; isActive: boolean }) => (
    <Link to={to} className={`${isActive ? "text-[#D2F801] font-bold outfit" : "hover:text-primary text-[#FFF4E8] duration-300"} text-sm`}>
        {label}
    </Link>
);

// Mobile Menu Component
const MobileMenu = ({ isOpen, toggleMenu, locationPath }: { isOpen: boolean; toggleMenu: () => void; locationPath: string }) => (
    <div className={`md:hidden flex flex-col gap-y-10 ${isOpen ? "translate-x-0 delay-500" : "-translate-x-full"} bg-[#050505] w-64 border-r border-[#EFEFEF] z-10 fixed top-0 left-0 h-dvh text-[#FFF4E8] transition-transform duration-500 ease-in-out p-4 py-20`} onClick={toggleMenu}>
        {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} label={link.label} isActive={locationPath === link.path} />
        ))}
        <Link to="/contact" className="bottom-8 left-4 absolute flex items-center gap-x-5 text-[#808080] hover:text-[#D2F801] duration-300">
            <MessageQuestion size="20" /> GET SUPPORT
        </Link>
    </div>
);

const Nav = () => {

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const location = useLocation();
    const show = location.pathname === "/"

    // Toggle Menu Visibility
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <main className="bg-[url('/hero_section.svg')] bg-cover bg-no-repeat px-[0.5rem] sm:px-8 md:px-[4rem] lg:px-[5rem] 2xl:px-[7rem] xl:px-[6rem] py-4">
            <nav className="z-[20] relative flex justify-between items-center">
                <div className="flex items-center gap-x-0.5">
                    <img src={logo} alt="Logo" className="w-12 md:w-16 2xl:w-20" />
                    <p className="md:hidden font-semibold text-[#EFEFEF] text-base">CBSH VAULT</p>
                </div>
                <div className="hidden md:flex items-center gap-x-5 lg:gap-x-7 xl:gap-x-10">
                    {NAV_LINKS.map((link) => (
                        <NavLink key={link.path} to={link.path} label={link.label} isActive={location.pathname === link.path} />
                    ))}
                </div>

                <Link to="/auth" className="hidden md:block bg-primary hover:bg-[#D2F801] px-6 py-3 rounded-3xl font-medium text-neutral-100 hover:text-neutral-800 text-sm duration-300">GET STARTED</Link>

                {/* Mobile Menu */}
                <Category2 className="md:hidden bg-white p-1 rounded-md size-7 text-primary cursor-pointer" variant="Bold" onClick={toggleMenu} />
                <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} locationPath={location.pathname} />

                {/* Overlay for Mobile Menu */}
                <div className={`md:hidden fixed inset-0 bg-black opacity-50 ${isMenuOpen ? "translate-x-0" : "-translate-x-full delay-500"} transition-transform duration-500 ease-in-out`} onClick={toggleMenu} />
            </nav>
            <header className={`${show ? "" : "hidden"} py-16`}>
                <section className="flex items-center gap-x-1 bg-white/10 mx-auto p-1 rounded-3xl w-fit text-neutral-100">
                    <div className="bg-[#D2F801] px-3 py-0.5 rounded-3xl text-blueBlack">New</div>
                    <p className="px-3">Payment Cards Upgraded</p>
                </section>
                <section className="flex flex-wrap justify-center items-center gap-2 mx-auto mt-7 md:mt-10 xl:mt-14 w-[80%] md:w-[70%] xl:w-[60%] font-medium text-neutral-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-center text-nowrap">
                    <h1>Say goodbye to</h1>
                    <span className="flex items-center bg-[#D2F801] py-0.5 md:py-1 lg:py-1.5 2xl:py-2 pr-4 pl-1 rounded-[3rem] w-fit text-blueBlack"><DollarCircle className="size-10 2xl:size-20" variant="Bold" /> financial</span>
                    <h1>stress & uncertainty</h1>
                </section>
                <p className="mx-auto my-6 max-w-[55ch] text-neutral-500 text-sm md:text-base xl:text-lg text-center">With our user-friendly interface and powerful features, you will have all the tools you need to manage your finances with ease.</p>

                <Link to="/auth" className="group flex items-center gap-x-2 bg-white hover:bg-[#D2F801] mx-auto my-10 px-6 py-2 rounded-[3rem] w-fit font-medium hover:font-semibold text-blueBlack hover:text-neutral-800 duration-300">CREATE ACCOUNT <ArrowRight className="bg-primary group-hover:bg-white p-2 rounded-[50%] size-9 md:size-10 text-white group-hover:text-blueBlack group-hover:translate-x-3 duration-300" /></Link>

                <section className="relative mx-auto w-fit">
                    <img src={currencyImg} alt="" className="mx-auto" />
                    <img src={heroIcon} alt="" className="hidden md:block top-1/2 -left-10 absolute animate-bounce pointer-events-none select-none" />
                    <img src={heroIcon1} alt="" className="hidden md:block top-1/2 -right-10 absolute animate-bounce pointer-events-none select-none" />
                </section>
            </header>
        </main >
    );
};

export default Nav