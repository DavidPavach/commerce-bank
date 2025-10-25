import { Link } from "react-router-dom";

//Components
import FirstSection from "./FirstSection";

//Icons
import { Home2 } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Second from "./Second";
import CTA from "../HomePage/CTA";

const index = () => {
    return (
        <main>
            <div className="flex items-center gap-x-1 text-[11px] md:text-xs xl:text-sm">
                <Link to="/" className="flex items-center gap-1 text-neutral-400 hover:text-primary transition-colors">
                    <Home2 variant="Bold" className="size-4" />
                    <span>HOME</span>
                </Link>
                <ChevronRight className="size-5" />
                <p className="font-medium">COMPANY</p>
            </div>
            <FirstSection />
            <Second />
            <CTA />
        </main>
    );
}

export default index;