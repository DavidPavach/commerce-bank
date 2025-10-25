import { Link } from "react-router-dom";

//Images
import firstImg from "/about2.jpg";
import appImg from "/appImg.png";
import security from "/security.jpg";

//Icons
// eslint-disable-next-line no-shadow-restricted-names
import { ArrowRight, Eye, Infinity, Lock, Send, Shield, Smartphone, TrendingUp, Zap } from "lucide-react";

const index = () => {
    return (
        <main>
            <section className="py-7 md:py-10 xl:py-14">
                <div className="items-center gap-5 grid grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-6">
                        <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                            <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                            <p className="text-xs md:text-sm xl:text-base">Banking Reimagined</p>
                        </main>
                        <h1 className="max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Banking at Your Fingertips</h1>
                        <p className="my-2 max-w-[55ch] text-neutral-500 text-sm md:text-base xl:text-lg">
                            Experience seamless digital banking with Commerce Bank. Manage your finances anytime, anywhere with our
                            secure, intuitive platform designed for modern banking.
                        </p>
                        <Link to="/auth" className="group flex items-center gap-x-2 bg-primary hover:bg-[#D2F801] mt-4 px-6 py-4 rounded-[3rem] w-fit font-medium hover:font-semibold text-neutral-100 hover:text-neutral-800 text-xs md:text-sm xl:text-base duration-300">GET STARTED NOW <ArrowRight className="size-5 md:size-6 group-hover:translate-x-3 duration-300" /></Link>
                    </div>
                    <div>
                        <img src={firstImg} alt="Digital Banking App" className="rounded-2xl" />
                    </div>
                </div>
            </section>

            <section className="py-7 md:py-10 xl:py-14">
                <div className="my-10 text-center">
                    <main className="flex items-center gap-x-2 mx-auto px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                        <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                        <p className="text-xs md:text-sm xl:text-base">Outstanding Features</p>
                    </main>
                    <h1 className="mx-auto mt-4 max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Powerful Features</h1>
                    <p className="mx-auto max-w-[30ch] text-neutral-500 text-sm md:text-base xl:text-lg">Everything you need to manage your finances efficiently and securely</p>
                </div>

                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="group hover:shadow-lg p-4 md:p-6 xl:p-8 border border-neutral-200 hover:border-primary rounded-xl transition-all duration-300">
                        <div className="flex justify-center items-center bg-green-50 group-hover:bg-primary mb-4 rounded-lg size-12 group-hover:text-white transition-colors">
                            <Smartphone className="size-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="mb-3 font-semibold text-base md:text-lg xl:text-xl">Mobile Banking</h3>
                        <p className="text-neutral-600">
                            Access your accounts on iOS and Android with our fully-featured mobile app. Check balances, transfer
                            funds, and pay bills on the go.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="group hover:shadow-lg p-4 md:p-6 xl:p-8 border border-neutral-200 hover:border-primary rounded-xl transition-all duration-300">
                        <div className="flex justify-center items-center bg-green-50 group-hover:bg-primary mb-4 rounded-lg size-12 group-hover:text-white transition-colors">
                            <Zap className="size-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="mb-3 font-semibold text-base md:text-lg xl:text-xl">Instant Transfers</h3>
                        <p className="text-neutral-600">
                            Send money to anyone, instantly. Our real-time transfer system ensures your funds arrive within seconds,
                            not days.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="group hover:shadow-lg p-4 md:p-6 xl:p-8 border border-neutral-200 hover:border-primary rounded-xl transition-all duration-300">
                        <div className="flex justify-center items-center bg-green-50 group-hover:bg-primary mb-4 rounded-lg size-12 group-hover:text-white transition-colors">
                            <Lock className="size-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="mb-3 font-semibold text-base md:text-lg xl:text-xl">Bank-Level Security</h3>
                        <p className="text-neutral-600">
                            Your data is protected with military-grade encryption and multi-factor authentication. We never
                            compromise on security.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="group hover:shadow-lg p-4 md:p-6 xl:p-8 border border-neutral-200 hover:border-primary rounded-xl transition-all duration-300">
                        <div className="flex justify-center items-center bg-green-50 group-hover:bg-primary mb-4 rounded-lg size-12 group-hover:text-white transition-colors">
                            <TrendingUp className="size-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="mb-3 font-semibold text-base md:text-lg xl:text-xl">Smart Analytics</h3>
                        <p className="text-neutral-600">
                            Get detailed insights into your spending patterns with our advanced analytics dashboard. Make informed
                            financial decisions.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="group hover:shadow-lg p-4 md:p-6 xl:p-8 border border-neutral-200 hover:border-primary rounded-xl transition-all duration-300">
                        <div className="flex justify-center items-center bg-green-50 group-hover:bg-primary mb-4 rounded-lg size-12 group-hover:text-white transition-colors">
                            <Eye className="size-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="mb-3 font-semibold text-base md:text-lg xl:text-xl">Real-Time Monitoring</h3>
                        <p className="text-neutral-600">
                            Monitor all your transactions in real-time. Get instant notifications for every activity on your
                            account.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="group hover:shadow-lg p-4 md:p-6 xl:p-8 border border-neutral-200 hover:border-primary rounded-xl transition-all duration-300">
                        <div className="flex justify-center items-center bg-green-50 group-hover:bg-primary mb-4 rounded-lg size-12 group-hover:text-white transition-colors">
                            <Send className="size-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="mb-3 font-semibold text-base md:text-lg xl:text-xl">Bill Payments</h3>
                        <p className="text-neutral-600">
                            Pay your bills directly from your account. Schedule recurring payments and never miss a deadline again.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-7 md:py-10 xl:py-14">
                <div className="items-center gap-5 grid grid-cols-1 lg:grid-cols-2">
                    <div className="order-2 lg:order-1">
                        <img src={appImg} alt="Mobile App Dashboard" className="rounded-2xl" />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2">
                        <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                            <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                            <p className="text-xs md:text-sm xl:text-base">Our App</p>
                        </main>
                        <h1 className="mt-4 max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Download Our App</h1>
                        <p className="max-w-[55ch] text-neutral-500 text-sm md:text-base xl:text-lg">
                            Our mobile app puts your entire banking experience in your pocket. Designed with simplicity and security
                            in mind.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-1 rounded-full size-6">
                                    <span className="font-bold text-white">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Intuitive Interface</h4>
                                    <p className="text-neutral-600">Easy to navigate, even for first-time users</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-1 rounded-full size-6">
                                    <span className="font-bold text-white">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Biometric Login</h4>
                                    <p className="text-neutral-600">Secure access with fingerprint or face recognition</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-1 rounded-full size-6">
                                    <span className="font-bold text-white">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">24/7 Availability</h4>
                                    <p className="text-neutral-600">Bank whenever you want, wherever you are</p>
                                </div>
                            </li>
                        </ul>
                        <Link to="/auth" className="group flex items-center gap-x-2 bg-primary hover:bg-[#D2F801] mt-4 px-12 py-4 rounded-[3rem] w-fit font-medium hover:font-semibold text-neutral-100 hover:text-neutral-800 text-xs md:text-sm xl:text-base duration-300">LOGIN <ArrowRight className="size-5 md:size-6 group-hover:translate-x-3 duration-300" /></Link>
                    </div>
                </div>
            </section>

            {/* Security & Trust Section */}
            <section className="py-7 md:py-10 xl:py-14">
                <div className="items-center gap-5 grid grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-6">
                        <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                            <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                            <p className="text-xs md:text-sm xl:text-base">Security</p>
                        </main>
                        <h1 className="max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Your Security is Our Priority</h1>
                        <p className="max-w-[55ch] text-neutral-500 text-sm md:text-base xl:text-lg">
                            We employ industry-leading security measures to protect your financial information and transactions.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Shield className="flex-shrink-0 mt-1 size-6 text-primary" />
                                <div>
                                    <h4 className="mb-1 font-semibold">256-Bit Encryption</h4>
                                    <p className="text-neutral-600">Military-grade encryption for all data transmission</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Shield className="flex-shrink-0 mt-1 size-6 text-primary" />
                                <div>
                                    <h4 className="mb-1 font-semibold">Multi-Factor Authentication</h4>
                                    <p className="text-neutral-600">
                                        Additional security layer with SMS, email, or authenticator apps
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Shield className="flex-shrink-0 mt-1 size-6 text-primary" />
                                <div>
                                    <h4 className="mb-1 font-semibold">Fraud Detection</h4>
                                    <p className="text-neutral-600">
                                        Advanced AI monitors transactions for suspicious activity
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Shield className="flex-shrink-0 mt-1 size-6 text-primary" />
                                <div>
                                    <h4 className="mb-1 font-semibold">FDIC Insured</h4>
                                    <p className="text-neutral-600">Your deposits are protected up to $250,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={security} alt="Security Features" className="rounded-2xl" />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20 md:py-28">
                <div className="mx-auto px-4 container">
                    <div className="mb-16 text-center">
                        <h1 className="mx-auto max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Why Choose Digital Banking?</h1>
                        <p className="mx-auto my-6 max-w-[55ch] text-neutral-500 text-sm md:text-base xl:text-lg">
                            Experience the benefits of modern banking with Commerce Bank
                        </p>
                    </div>

                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white shadow-sm hover:shadow-md p-4 md:p-6 xl:p-8 rounded-xl transition-shadow">
                            <div className="mb-2 text-primary text-xl md:text-2xl xl:text-3xl outfit">24/7</div>
                            <h3 className="mb-2 font-semibold">Always Available</h3>
                            <p className="text-neutral-600">Bank whenever you want, no business hours restrictions</p>
                        </div>
                        <div className="bg-white shadow-sm hover:shadow-md p-4 md:p-6 xl:p-8 rounded-xl transition-shadow">
                            <div className="mb-2 text-primary text-xl md:text-2xl xl:text-3xl outfit">0%</div>
                            <h3 className="mb-2 font-semibold">No Hidden Fees</h3>
                            <p className="text-neutral-600">Transparent pricing with no surprise charges</p>
                        </div>
                        <div className="bg-white shadow-sm hover:shadow-md p-4 md:p-6 xl:p-8 rounded-xl transition-shadow">
                            <div className="mb-2 text-primary"><Infinity className="size-6 md:size-7 xl:size-8" /></div>
                            <h3 className="mb-2 font-semibold">Unlimited Transactions</h3>
                            <p className="text-neutral-600">Make as many transactions as you need</p>
                        </div>
                        <div className="bg-white shadow-sm hover:shadow-md p-4 md:p-6 xl:p-8 rounded-xl transition-shadow">
                            <div className="mb-2 text-primary text-xl md:text-2xl xl:text-3xl outfit">1s</div>
                            <h3 className="mb-2 font-semibold">Instant Processing</h3>
                            <p className="text-neutral-600">Real-time transaction processing and updates</p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default index;