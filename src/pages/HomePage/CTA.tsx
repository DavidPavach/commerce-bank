import { Link } from "react-router-dom";

//Component
import RenderStars from "@/components/RenderStars";

//Icons
import { ArrowRight } from "iconsax-react";

const CTA = () => {
    return (
        <main className="bg-[url('/cta.svg')] bg-cover bg-no-repeat mx-auto p-4 py-7 md:py-10 xl:py-14 rounded-[2rem] md:rounded-[2.rem] xl:rounded-[3rem] w-[95%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] text-neutral-400">
            <div className="flex justify-center items-center gap-x-2">
                <RenderStars rating={(5)} />
                <p className="text-[11px] md:text-xs xl:text-sm">4.9/5</p>
            </div>
            <p className="mx-auto mt-4 max-w-[25ch] text-center">Over 100K+ Entrepreneurs, and business choose us</p>
            <h1 className="mx-auto my-6 max-w-[20ch] font-medium text-neutral-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-center">Empowering Your Financial Freedom</h1>
            <p className="mx-auto max-w-[55ch] text-center">Trust us to deliver cutting-edge innovation, transparency, and personalized service, all designed to help you achieve financial freedom</p>
            <Link to="/auth" className="group flex items-center gap-x-2 bg-white hover:bg-[#D2F801] mx-auto my-10 px-6 py-2 rounded-[3rem] w-fit font-medium hover:font-semibold text-blueBlack hover:text-neutral-800 duration-300">CREATE ACCOUNT <ArrowRight className="bg-primary group-hover:bg-white p-2 rounded-[50%] size-9 md:size-10 text-white group-hover:text-blueBlack group-hover:translate-x-3 duration-300" /></Link>
        </main>
    );
}

export default CTA;