import { useState } from "react";

//Images
import smartImg from "/smart_banking.png";

//Icons
import { ChevronDown } from "lucide-react";

const SmartBanking = () => {

    const FAQS = [
        { question: "Personalized Financial Insights", answer: "Receive tailored insights and recommendations based on your spending habits, helping you make smarter financial decisions." },
        { question: "Bill Payment Reminders", answer: "Stay on track with timely bill payment reminders, ensuring you never miss a deadline and avoid late fees" },
        { question: "Peer-to-Peer Transfers", answer: "Easily make peer-to-peer transfers, allowing you to send and receive money quickly and securely to friends and family." }
    ]

    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    return (
        <main className="flex md:flex-row flex-col md:justify-between md:items-center gap-y-5 md:gap-y-0 py-7 md:py-10 xl:py-14">
            <section className="flex flex-col gap-y-5 w-full md:w-[45%] xl:w-[48%] text-sm md:text-base xl:text-lg">
                <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                    <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                    <p className="text-xs md:text-sm xl:text-base">Seamless Banking</p>
                </main>
                <h1 className="max-w-[14ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Smart Banking for a Digital World.</h1>
                <p className="max-w-[50ch] text-neutral-600">Our banking service revolutionizes the way you manage your money, offering seamless, secure, and smart solutions for all your financial needs.</p>
                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-[#F2F5F7] shadow-sm rounded-2xl overflow-hidden">
                            <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="flex justify-between items-center hover:bg-white px-6 py-4 w-full transition-colors">
                                <section className="flex items-center gap-x-2 text-white">
                                    <div className="place-content-center grid bg-primary rounded-[50%] size-5 md:size-6 xl:size-7 text-[11px] md:text-xs xl:text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="font-medium text-blueBlack text-left">{faq.question}</p>
                                </section>
                                <ChevronDown className={`size-5 text-primary transition-transform ${openFAQ === index ? "rotate-180" : ""}`} />
                            </button>
                            {openFAQ === index && (
                                <div className="bg-neutral-50 px-6 py-4 border-neutral-200 border-t">
                                    <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="w-full md:w-[45%] xl:w-[48%]">
                <img src={smartImg} alt="Image" className="rounded-3xl" />
            </section>
        </main>
    );
}

export default SmartBanking;