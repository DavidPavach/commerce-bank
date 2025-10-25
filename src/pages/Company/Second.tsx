//Icons
import { Shield, TrendingUp, Users, Zap } from "lucide-react";

const Second = () => {

    const services = [
        {
            title: "Personal Banking",
            description:
                "Checking and savings accounts, debit cards, online and mobile banking, personal loans, mortgages, and home equity lending.",
            icon: Users,
        },
        {
            title: "Business Banking",
            description:
                "Business checking and savings, commercial loans, lines of credit, treasury management, merchant services, and business credit cards.",
            icon: TrendingUp,
        },
        {
            title: "Wealth & Advisory",
            description:
                "Investment and retirement planning, trust services, and personalized wealth management for individuals and business owners.",
            icon: Zap,
        },
        {
            title: "Digital Services",
            description:
                "Mobile app, online account opening, remote check deposit, e-statements, and robust security features.",
            icon: Shield,
        },
    ]


    return (
        <main className="bg-[url('/hero_section.svg')] bg-cover bg-no-repeat mb-20 px-4 py-7 md:py-10 xl:py-14 rounded-2xl text-neutral-100">
            <section className="flex items-center gap-x-2 mx-auto px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                <p>Our Services</p>
            </section>
            <h1 className="mx-auto mt-10 max-w-[25ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-center">What We Offer</h1>
            <p className="mx-auto my-6 max-w-[55ch] text-neutral-400 text-sm md:text-base xl:text-lg text-center">Comprehensive banking solutions tailored to meet the unique needs of individuals, families, and businesses.</p>
            <div className="gap-8 grid md:grid-cols-2 p-4 md:p-6 2xl:p-10 xl:p-8">
                {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                        <div key={index} className="group relative bg-white shadow-md hover:shadow-2xl border border-gray-100 hover:border-[#1D9B5E] rounded-xl overflow-hidden transition-all duration-300">
                            {/* Background accent */}
                            <div className="top-0 right-0 absolute bg-gradient-to-br from-[#1D9B5E]/5 to-[#F57C00]/5 -mt-16 -mr-16 rounded-full size-32 group-hover:scale-150 transition-transform duration-300" />

                            <div className="relative p-4 md:p-6 xl:p-8">
                                
                                <div className="top-6 right-6 absolute font-bold text-[#1D9B5E]/10 group-hover:text-[#1D9B5E]/20 text-3xl md:text-4xl xl:text-5xl transition-colors">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="inline-block mb-6">
                                    <div className="bg-gradient-to-br from-[#1D9B5E] to-[#0D7A47] shadow-lg group-hover:shadow-xl p-4 rounded-xl transition-all">
                                        <Icon className="size-5 md:size-6 xl:size-7 text-white" />
                                    </div>
                                </div>

                                <h3 className="mb-3 font-bold text-gray-900 group-hover:text-[#1D9B5E] text-lg md:text-xl xl:text-2xl transition-colors">
                                    {service.title}
                                </h3>
                                <p className="mb-4 text-gray-700 leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
}

export default Second;