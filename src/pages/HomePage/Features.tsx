//Icons
import { BrifecaseTick, Calculator, Card, Mobile, MoneySend, MonitorMobbile } from "iconsax-react";

const Features = () => {

    const FEATURES = [
        { icon: <MonitorMobbile className="size-6 md:size-7" />, title: "Instant Account Setup", body: "Customers can set up a bank account in minutes" },
        { icon: <MoneySend className="size-6 md:size-7" />, title: "Real-Time Payments", body: "Enables instant money transfers, both domestically and internationally" },
        { icon: <Mobile variant="Outline" className="size-6 md:size-7" />, title: "Mobile Banking", body: "Full-featured mobile app that allows users to manage their finances" },
        { icon: <BrifecaseTick className="size-6 md:size-7" />, title: "Automated Savings", body: "Round up purchases or set regular transfers into a savings account" },
        { icon: <Calculator className="size-6 md:size-7" />, title: "AI-Powered Budgeting", body: "AI tools analyze spending patterns and provide personalized budgeting" },
        { icon: <Card className="size-6 md:size-7" />, title: "Virtual Credit Cards", body: "Generate virtual cards instantly for online shopping" },
    ]

    return (
        <main className="py-7 md:py-10 xl:py-14">
            <section className="flex items-center gap-x-2 mx-auto px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                <p>Features</p>
            </section>
            <h1 className="mx-auto mt-10 max-w-[20ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-center">Banking Reimagined for the Future You</h1>
            <p className="mx-auto my-6 max-w-[55ch] text-neutral-600 text-sm md:text-base xl:text-lg text-center">Trust us to deliver cutting-edge innovation, transparency, and personalized service, all designed to help you achieve financial freedom</p>
            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
                {FEATURES.map((feature, index) => (
                    <div key={`${index}_features_card`} className="flex flex-col gap-y-3 bg-[#F2F5F7] p-4 md:p-6 xl:p-8 border border-[#0A1519]/10 rounded-[2rem] text-neutral-100 text-center">
                        <div className="bg-primary mx-auto p-2 rounded-[50%]">
                            {feature.icon}
                        </div>
                        <h3 className="mt-2 font-medium text-blueBlack text-lg md:text-xl xl:text-2xl outfit">{feature.title}</h3>
                        <p className="mx-auto max-w-[28ch] text-neutral-600">{feature.body}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Features;