import { Link } from "react-router-dom";

//Icons
import { Briefcase, Heart } from "iconsax-react";

const index = () => {
    return (
        <main>
            <section className="py-7 md:py-10 xl:py-14">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#1D9B5E] opacity-10 blur-xl rounded-full" />
                            <div className="relative bg-gradient-to-br from-[#1D9B5E] to-[#0D9B5E] p-4 rounded-full">
                                <Briefcase className="size-8 text-white" />
                            </div>
                        </div>
                    </div>
                    <h1 className="mb-6 font-medium text-[#080200] text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl outfit">Join Our Team</h1>
                    <p className="mx-auto mb-8 max-w-2xl text-neutral-600 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
                        At CBSH Bank (Commerce Bank and Savings Holdings), we're committed to building a team of talented
                        professionals dedicated to excellence in banking.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section >
                <div className="mx-auto max-w-3xl">
                    {/* Not Hiring Card */}
                    <div className="bg-white shadow-lg mb-8 border border-neutral-200 rounded-2xl overflow-hidden">
                        {/* Top Accent Bar */}
                        <div className="bg-gradient-to-r from-[#1D9B5E] to-[#F57C00] h-1" />

                        {/* Content */}
                        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-center">
                            {/* Status Badge */}
                            <div className="inline-block bg-neutral-100 mb-6 px-4 py-2 border border-neutral-300 rounded-full font-semibold text-neutral-700">
                                Currently Not Hiring
                            </div>

                            {/* Message */}
                            <h2 className="mb-4 font-bold text-[#080200] text-lg md:text-xl lg:text-2xl xl:text-3xl">We're Not Currently Hiring</h2>
                            <p className="mb-8 text-neutral-600 text-sm md:text-base xl:text-lg leading-relaxed">
                                Thank you for your interest in joining CBSH Bank! At this time, we don't have any open positions
                                available. However, we're always looking for talented individuals who share our values of integrity,
                                innovation, and customer-first service.
                            </p>

                            {/* Divider */}
                            <div className="bg-neutral-200 my-8 h-px" />

                            {/* Call to Action */}
                            <div className="space-y-6">
                                <h3 className="font-semibold text-[#080200] text-xl">Stay Connected</h3>
                                <p className="text-neutral-600">
                                    We encourage you to check back regularly or subscribe to our updates to be notified when new
                                    opportunities become available.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Why Work With Us */}
                    <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-neutral-200 rounded-2xl overflow-hidden">
                        <h3 className="mb-8 font-bold text-[#080200] text-lg md:text-xl xl:text-2xl text-center">Why Work With CBSH Bank?</h3>
                        <div className="gap-5 grid md:grid-cols-2">
                            {[
                                {
                                    title: "Innovation First",
                                    description:
                                        "We embrace cutting-edge technology and modern banking solutions to serve our customers better.",
                                },
                                {
                                    title: "Customer Focused",
                                    description:
                                        "Every decision we make is guided by our commitment to putting customers first and exceeding expectations.",
                                },
                                {
                                    title: "Integrity & Trust",
                                    description:
                                        "We operate with the highest ethical standards and transparency in all our business practices.",
                                },
                                {
                                    title: "Growth Opportunities",
                                    description:
                                        "We invest in our team members and provide opportunities for professional development and career advancement.",
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex justify-center items-center bg-[#fdff81] rounded-lg w-10 h-10 text-[#080200]">
                                            <Heart className="size-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-2 font-semibold text-[#080200] text-sm md:text-base xl:text-lg">{item.title}</h4>
                                        <p className="text-neutral-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-12 text-center">
                        <p className="mb-6 text-neutral-600">Have questions? Feel free to reach out to us.</p>
                        <Link to="/contact" className="inline-block bg-[#1D9B5E] hover:bg-[#0D9B5E] px-8 py-3 rounded-lg font-semibold text-white transition">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default index;