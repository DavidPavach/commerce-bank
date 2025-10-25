//Images
import aboutImg from "/about.jpg";

//Icons
import { CheckCircle } from "lucide-react";

const FirstSection = () => {
    return (
        <main className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-y-5 lg:gap-y-0 py-7 md:py-10 xl:py-14">
            <section className="w-full lg:w-[45%] xl:w-[48%]">
                <img src={aboutImg} alt="Card Images" className="rounded-3xl" />
            </section>
            <section className="flex flex-col gap-y-5 w-full lg:w-[45%] xl:w-[48%] text-sm md:text-base xl:text-lg">
                <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                    <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                    <p className="text-xs md:text-sm xl:text-base">Company</p>
                </main>
                <h1 className="max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">The Story Behind <span className="text-primary">CBSH Bank.</span></h1>
                <div className="space-y-5 max-w-[70ch] text-neutral-600">
                    <p>Commerce Bank and Savings Holdings is a customer-focused financial institution founded in 2015. We provide a full range of banking services to individuals, families, and businesses, combining modern digital tools with the personalized service of a community bank.</p>
                    <p>With a decade of steady operation, we've built a reputation for conservative risk management, transparent practices, and genuine commitment to our customers' financial success.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-2 border border-neutral-300 rounded-2xl w-full 2xl:w-[90%] xl:w-[80%]">
                        <div className="flex-shrink-0 bg-[#1D9B5E] mt-1 p-2 rounded-full">
                            <CheckCircle className="size-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 outfit">Founded in 2015</h3>
                            <p className="text-gray-600">With a vision for community banking excellence</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 border border-neutral-300 rounded-2xl w-full 2xl:w-[90%] xl:w-[80%]">
                        <div className="flex-shrink-0 bg-[#1D9B5E] mt-1 p-2 rounded-full">
                            <CheckCircle className="size-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 outfit">Serving Thousands</h3>
                            <p className="text-gray-600">Of satisfied customers nationwide</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 border border-neutral-300 rounded-2xl w-full 2xl:w-[90%] xl:w-[80%]">
                        <div className="flex-shrink-0 bg-[#1D9B5E] mt-1 p-2 rounded-full">
                            <CheckCircle className="size-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 outfit">Industry-Leading Security</h3>
                            <p className="text-gray-600">With compliance and protection standards</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default FirstSection;