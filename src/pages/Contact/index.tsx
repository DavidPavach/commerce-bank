import { useState } from "react";

//Icons
import { ChevronDown, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Index = () => {

    const [openFAQ, setOpenFAQ] = useState<number | null>(0);
    const faqs = [
        {
            question: "How do I reset my password?",
            answer:
                "To reset your password, click on 'Forgot Password' on the auth page. Enter your email address and follow the instructions sent to your inbox. You'll receive a secure link to create a new password.",
        },
        {
            question: "What are your customer service hours?",
            answer:
                "Our customer service team is available Monday through Friday, 8:00 AM to 8:00 PM EST, and Saturday 9:00 AM to 5:00 PM EST. We're closed on Sundays and major holidays. Account owners can always reach out to their Banking Buddy—available 24/7",
        },
        {
            question: "How long does a transfer take?",
            answer:
                "Domestic transfers typically take 1-2 business days. International transfers may take 3-5 business days depending on the destination country and banking institutions involved.",
        },
        {
            question: "Is my account secure?",
            answer:
                "Yes, we use industry-leading encryption and security protocols to protect your account. We employ 256-bit SSL encryption, multi-factor authentication, and continuous fraud monitoring.",
        },
        {
            question: "What fees apply to my account?",
            answer:
                "Fees vary depending on your account type. Please visit our Fees & Charges page or contact us directly for detailed information about your specific account.",
        },
        {
            question: "How do I report suspicious activity?",
            answer:
                "If you notice any suspicious activity on your account, contact us immediately at email support@cbshvault.com. We'll investigate and take appropriate action.",
        },
    ]

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Support",
            description: "Send us your questions",
            details: "support@cbshvault.com",
            color: "bg-accent",
        },
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Chat with our support team",
            details: "Have an account? Chat with Banking Buddy—available 24/7",
            color: "bg-blueBlack",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            description: "Find a branch near you",
            details: "2740 W 55th St, Chicago, IL 60632, United States",
            color: "bg-primary",
        },
    ]

    return (
        <main className="bg-neutral-50 min-h-dvh">

            <div className="bg-white border-neutral-200 border-b">
                <div className="mx-auto px-4 py-12 container">
                    <h1 className="mb-2 font-bold text-blueBlack text-2xl md:text-3xl xl:text-4xl outfit">Support Center</h1>
                    <p className="text-neutral-600">We're here to help. Find answers and get support.</p>
                </div>
            </div>

            <div className="mx-auto px-4 py-12 container">
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-12">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon
                        return (
                            <div key={index} className="bg-white shadow-sm hover:shadow-md p-2 md:p-4 xl:p-6 rounded-lg transition-shadow">
                                <div className={`${method.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                    <Icon className="size-5 md:size-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-semibold text-blueBlack text-sm md:text-base xl:text-lg">{method.title}</h3>
                                <p className="mb-3 text-neutral-600 text-xs xl:text-sm">{method.description}</p>
                                <p className="font-semibold text-primary text-xs xl:text-sm">{method.details}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mx-auto px-4 py-12 max-w-4xl container">
                <div className="mb-8">
                    <h2 className="flex items-center gap-2 mb-2 font-bold text-blueBlack text-xl md:text-2xl xl:text-3xl outfit">
                        <span className="bg-primary rounded w-1 h-8"></span>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-neutral-600">Find quick answers to common questions</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="flex justify-between items-center hover:bg-neutral-50 px-6 py-4 w-full transition-colors">
                                <span className="font-medium text-blueBlack text-left outfit">{faq.question}</span>
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
            </div>

            <div className="mx-auto px-4 py-12 max-w-4xl container">
                <div className="bg-white shadow-sm p-4 md:p-6 xl:p-8 border-primary border-l-4 rounded-lg">
                    <div className="flex items-start gap-4">
                        <Clock className="flex-shrink-0 mt-1 size-6 text-primary" />
                        <div>
                            <h3 className="mb-4 font-bold text-blueBlack text-base md:text-lg xl:text-xl outfit">Business Hours</h3>
                            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <p className="mb-2 font-semibold text-blueBlack">Weekdays (Mon-Fri)</p>
                                    <p className="text-neutral-600">8:00 AM - 8:00 PM EST</p>
                                </div>
                                <div>
                                    <p className="mb-2 font-semibold text-blueBlack">Saturday</p>
                                    <p className="text-neutral-600">9:00 AM - 5:00 PM EST</p>
                                </div>
                                <div>
                                    <p className="mb-2 font-semibold text-blueBlack">Sunday</p>
                                    <p className="text-neutral-600">Closed</p>
                                </div>
                                <div>
                                    <p className="mb-2 font-semibold text-blueBlack">Holidays</p>
                                    <p className="text-neutral-600">Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[url('/hero_section.svg')] bg-cover bg-no-repeat mt-12 py-12 text-white">
                <div className="mx-auto px-4 text-center container">
                    <h2 className="mb-4 font-bold text-xl md:text-2xl xl:text-3xl outfit">Still need help?</h2>
                    <p className="mx-auto mb-6 max-w-2xl text-white/90">
                        Our support team is ready to assist you. Don't hesitate to reach out with any questions or concerns.
                    </p>
                    <button className="bg-white hover:bg-neutral-100 px-8 py-3 rounded-lg font-semibold text-primary transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Index;