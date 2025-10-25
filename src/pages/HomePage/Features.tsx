//Icons
import { BrifecaseTick, Calculator, Card, Mobile, MoneySend, MonitorMobbile } from "iconsax-react";

const Features = () => {

    const FEATURES = [
        { icon: <MonitorMobbile className="size-6 md:size-7" />, title: "Instant Account Setup", body: "Customers can set up a bank account in minutes" },
        { icon: <MoneySend className="size-6 md:size-7" />, title: "Real-Time Payments", body: "Enables instant money transfers, both domestically and internationally" },
        { icon: <Mobile className="size-6 md:size-7" />, title: "Mobile Banking", body: "Full-featured mobile app that allows users to manage their finances" },
        { icon: <BrifecaseTick className="size-6 md:size-7" />, title: "Automated Savings", body: "Round up purchases or set regular transfers into a savings account" },
        { icon: <Calculator className="size-6 md:size-7" />, title: "AI-Powered Budgeting", body: "AI tools analyze spending patterns and provide personalized budgeting" },
        { icon: <Card className="size-6 md:size-7" />, title: "Virtual Credit Cards", body: "Generate virtual cards instantly for online shopping" },
    ]

    return (
        <main className="py-7 md:py-10 xl:py-14">
            <section className="mx-auto w-fit border-primary border px-3 text-primary py-1 rounded-3xl font-medium tracking-wide flex gap-x-2 items-center">
                <div className="rounded-[50%] size-1 md:size-1.5 xl:size-2 bg-primary" />
                <p>Features</p>
            </section>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl mx-auto text-center font-medium max-w-[20ch] mt-10">Banking Reimagined for the Future You</h1>
            <p className="mx-auto my-6 max-w-[55ch] text-neutral-600 text-sm md:text-base xl:text-lg text-center">Trust us to deliver cutting-edge innovation, transparency, and personalized service, all designed to help you achieve financial freedom</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                {FEATURES.map((feature, index) => (
                    <div key={`${index}_features_card`} className="flex flex-col gap-y-3 bg-[#F2F5F7] text-neutral-100 text-center border border-[#0A1519]/10 rounded-[2rem] p-4 md:p-6 xl:p-8">
                        <div className="p-2 rounded-[50%] bg-primary mx-auto">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg md:text-xl xl:text-2xl font-medium text-blueBlack outfit mt-2">{feature.title}</h3>
                        <p className="text-neutral-600 max-w-[28ch] mx-auto">{feature.body}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Features;