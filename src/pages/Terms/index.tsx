//Components
import Footer from "../HomePage/Footer";

const Index = () => {
    return (
        <main>

            <div className="bg-[url('/hero_section.svg')] bg-cover bg-no-repeat border-neutral-200 border-b">
                <div className="mx-auto px-4 py-12 container">
                    <h1 className="mb-2 font-bold text-white text-2xl md:text-3xl xl:text-4xl outfit">Terms of Service</h1>
                    <p className="text-neutral-300">Last updated: October 2025</p>
                </div>
            </div>

            <div className="mx-auto px-4 py-12 max-w-4xl container">
                <div className="space-y-8 bg-white shadow-sm p-4 md:p-6 xl:p-8 rounded-lg">
                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Agreement to Terms
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            By accessing and using this website and our banking services, you accept and agree to be bound by the
                            terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                            service.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Use License
                        </h2>
                        <p className="mb-4 text-neutral-600">
                            Permission is granted to temporarily download one copy of the materials (information or software) on our
                            website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                            transfer of title, and under this license you may not:
                        </p>
                        <ul className="space-y-3 text-neutral-600">
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Modify or copy the materials</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Use the materials for any commercial purpose or for any public display</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Attempt to decompile or reverse engineer any software contained on the website</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Remove any copyright or other proprietary notations from the materials</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-primary">•</span>
                                <span>Transfer the materials to another person or "mirror" the materials on any other server</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Account Responsibility
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account information and password and for
                            restricting access to your computer. You agree to accept responsibility for all activities that occur
                            under your account or password. You must notify us immediately of any unauthorized uses of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Disclaimer
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or
                            implied, and hereby disclaim and negate all other warranties including, without limitation, implied
                            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                            intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Limitations of Liability
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            In no event shall our bank or its suppliers be liable for any damages (including, without limitation,
                            damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                            to use the materials on our website, even if we or our authorized representative has been notified orally
                            or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Accuracy of Materials
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            The materials appearing on our website could include technical, typographical, or photographic errors. We
                            do not warrant that any of the materials on our website are accurate, complete, or current. We may make
                            changes to the materials contained on our website at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">
                            <span className="bg-primary rounded w-1 h-8"></span>
                            Modifications to Terms
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            We may revise these terms of service for our website at any time without notice. By using this website,
                            you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>

                    <section className="bg-neutral-50 p-6 border border-neutral-200 rounded-lg">
                        <h2 className="mb-4 font-bold text-blueBlack text-lg md:text-xl xl:text-2xl outfit">Governing Law</h2>
                        <p className="text-neutral-600">
                            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
                            in which our bank is located, and you irrevocably submit to the exclusive jurisdiction of the courts in
                            that location.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Index;