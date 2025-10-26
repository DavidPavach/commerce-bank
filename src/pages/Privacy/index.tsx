//Component
import Footer from "../HomePage/Footer";

const Index = () => {
    return (
        <main>

            <div className="bg-[url('/hero_section.svg')] bg-cover bg-no-repeat border-neutral-200 border-b">
                <div className="mx-auto px-4 py-12 container">
                    <h1 className="mb-2 font-bold text-white text-2xl md:text-3xl xl:text-4xl outfit">Privacy Policy</h1>
                    <p className="text-neutral-300">Last updated: October 2025</p>
                </div>
            </div>

            <div className="mx-auto px-4 py-12 max-w-4xl container">
                <div className="space-y-8 bg-white shadow-sm p-4 md:p-6 xl:p-8 rounded-lg">
                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Introduction
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            At our bank, we are committed to protecting your privacy and ensuring you have a positive experience on
                            our website and with our services. This Privacy Policy explains how we collect, use, disclose, and
                            safeguard your information when you visit our website and use our banking services.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Information We Collect
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-semibold text-blueBlack outfit">Personal Information</h3>
                                <p className="text-neutral-600">
                                    We collect information you provide directly, such as your name, email address, phone number, postal
                                    address, and financial information necessary to provide banking services.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold text-blueBlack outfit">Automatic Information</h3>
                                <p className="text-neutral-600">
                                    When you access our website, we automatically collect certain information about your device, including
                                    IP address, browser type, operating system, and pages visited.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold text-blueBlack outfit">Cookies and Tracking</h3>
                                <p className="text-neutral-600">
                                    We use cookies and similar tracking technologies to enhance your experience, remember your
                                    preferences, and understand how you use our services.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            How We Use Your Information
                        </h2>
                        <ul className="space-y-3 text-neutral-600">
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>To provide, maintain, and improve our banking services</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>To process transactions and send related information</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>To send promotional communications and updates</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>To comply with legal obligations and prevent fraud</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>To analyze usage patterns and improve our services</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Data Security
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            We implement comprehensive security measures to protect your personal information from unauthorized
                            access, alteration, disclosure, or destruction. Our security protocols include encryption, secure servers,
                            and regular security audits. However, no method of transmission over the internet is 100% secure, and we
                            cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Your Rights
                        </h2>
                        <p className="mb-4 text-neutral-600">You have the right to:</p>
                        <ul className="space-y-3 text-neutral-600">
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Access your personal information</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Correct inaccurate data</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Request deletion of your data</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Opt-out of marketing communications</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-neutral-50 p-6 border border-neutral-200 rounded-lg">
                        <h2 className="mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">Contact Us</h2>
                        <p className="mb-4 text-neutral-600">
                            If you have questions about this Privacy Policy or our privacy practices, please contact us:
                        </p>
                        <div className="space-y-2 text-neutral-600">
                            <p><strong>Email:</strong> privacy@cbshvault.com</p>
                            <p><strong>Address:</strong> 2740 W 55th St, Chicago, IL 60632, United States</p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Index;