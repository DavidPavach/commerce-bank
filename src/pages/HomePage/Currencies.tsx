import { Link } from "react-router-dom";

//Images
import currencyImg from "/currencies_.svg";

//Icons
import { ArrowRight, TickCircle } from "iconsax-react";

const Currencies = () => {

    const ADVANTAGES = ["Convert between currencies instantly.", "Simple and intuitive platform for managing.", "Manage your currencies anytime, anywhere"];

    return (
        <main className="flex md:flex-row flex-col md:justify-between md:items-center gap-y-5 md:gap-y-0 py-7 md:py-10 xl:py-14">
            <section className="flex flex-col gap-y-5 mx-auto w-full md:w-[45%] xl:w-[48%] text-sm md:text-base xl:text-lg">
                <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                    <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                    <p className="text-xs md:text-sm xl:text-base">Limitless Currency Options</p>
                </main>
                <h1 className="max-w-[12ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">One account for 25+ currencies worldwide.</h1>
                <p className="max-w-[40ch] text-neutral-600">Our platform allows you to send, receive, and convert currencies seamlessly in real-time, all while saving on fees.</p>
                <section className="flex flex-col gap-y-5">
                    {ADVANTAGES.map((advantage, index) => (
                        <div key={`advantages_${index}`} className="flex items-center gap-x-2"><TickCircle variant="Bold" className="size-5 md:size-6 xl:size-7 text-primary" />{advantage}</div>
                    ))}
                </section>
                <Link to="/auth" className="group flex items-center gap-x-2 bg-primary hover:bg-[#D2F801] mt-4 px-6 py-4 rounded-[3rem] w-fit font-medium hover:font-semibold text-neutral-100 hover:text-neutral-800 text-xs md:text-sm xl:text-base duration-300">GET STARTED NOW <ArrowRight className="size-5 md:size-6 group-hover:translate-x-3 duration-300" /></Link>
            </section>
            <section className="w-full md:w-[45%] xl:w-[48%]">
                <img src={currencyImg} alt="Image" className="mx-auto" />
            </section>
        </main>
    );
}

export default Currencies;