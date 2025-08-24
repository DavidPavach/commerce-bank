import { Link, NavLink } from "react-router-dom";

//Icons
import { Calendar, Clock } from "iconsax-react";
import { AlertCircle, Mail, Phone } from "lucide-react";

const Pending = () => {
    return (
        <div className="bg-neutral-50 min-h-dvh">
            <div className="mx-auto px-4 md:px-6 py-8 max-w-5xl">
                <div className="bg-white shadow-sm p-6 md:p-8 lg:p-10 xl:p-12 border border-neutral-200 rounded-xl text-center">
                    <div className="flex justify-center items-center bg-accent/10 mx-auto mb-8 rounded-full size-16 md:size-20 xl:size-24">
                        <Clock className="size-10 md:size-12 xl:size-14 text-accent" />
                    </div>
                    <h1 className="mb-4 font-bold text-lightBlack text-xl md:text-2xl xl:text-3xl">
                        Loan Services Temporarily Paused
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-neutral-600 text-sm md:text-base xl:text-lg leading-relaxed">
                        We're currently updating our loan application system to serve you better.
                        New loan applications are temporarily paused while we enhance our services.
                    </p>

                    <div className="bg-goldenYellow/10 mx-auto mb-8 p-4 md:p-6 border border-goldenYellow/30 rounded-lg max-w-md">
                        <div className="flex justify-center items-center space-x-3 mb-3">
                            <AlertCircle className="size-4 md:size-5 xl:size-6 text-accent" />
                            <span className="font-semibold text-lightBlack">System Status</span>
                        </div>
                        <p className="text-neutral-700">
                            <strong>Current Status:</strong> Maintenance Mode
                        </p>
                        <p className="text-neutral-700">
                            <strong>Expected Resume:</strong> Coming Soon
                        </p>
                    </div>

                    <div className="mx-auto mb-8 max-w-2xl text-left">
                        <h2 className="mb-4 font-semibold text-lightBlack text-base md:text-lg xl:text-xl text-center">
                            What You Can Do Right Now
                        </h2>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="bg-neutral-50 p-4 rounded-lg">
                                <h3 className="mb-2 font-medium text-lightBlack">Existing Loan Customers</h3>
                                <p className="text-[11px] text-neutral-600 md:text-xs xl:text-sm">
                                    Continue making payments and managing your current loans through your dashboard.
                                </p>
                            </div>
                            <div className="bg-neutral-50 p-4 rounded-lg">
                                <h3 className="mb-2 font-medium text-lightBlack">Get Notified</h3>
                                <p className="text-[11px] text-neutral-600 md:text-xs xl:text-sm">
                                    We'll notify you via email and SMS when loan applications resume.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-neutral-200 border-t">
                        <h3 className="mb-6 font-semibold text-lightBlack text-lg">
                            Need Immediate Assistance?
                        </h3>
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                            <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary/10 mb-3 rounded-full size-10 md:size-12 xl:size-14">
                                    <Phone className="size-5 md:size-6 xl:size-7 text-primary" />
                                </div>
                                <h4 className="mb-1 font-medium text-lightBlack">Live Support</h4>
                                <Link to="/user/support" className="text-neutral-600 hover:text-primary text-sm hover:underline">Go to Support</Link>
                                <p className="text-neutral-500 text-xs">24/7 Support</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary/10 mb-3 rounded-full size-10 md:size-12 xl:size-14">
                                    <Mail className="size-5 md:size-6 xl:size-7 text-primary" />
                                </div>
                                <h4 className="mb-1 font-medium text-lightBlack">Email Support</h4>
                                <p className="text-neutral-600 text-sm">loans@commercebankusa.com</p>
                                <p className="text-neutral-500 text-xs">Response within 24 hours</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary/10 mb-3 rounded-full size-10 md:size-12 xl:size-14">
                                    <Calendar className="size-5 md:size-6 xl:size-7 text-primary" />
                                </div>
                                <h4 className="mb-1 font-medium text-lightBlack">Schedule Callback</h4>
                                <p className="text-neutral-600 text-sm">Book a consultation</p>
                                <p className="text-neutral-500 text-xs">Available Mon-Fri</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex sm:flex-row flex-col justify-center gap-4 mt-8">
                        <NavLink to="/user/support" className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-lg font-medium text-white transition-colors">
                            Contact Support
                        </NavLink>
                        <NavLink to="/user/dashboard" className="hover:bg-neutral-50 px-8 py-3 border border-neutral-200 rounded-lg font-medium text-lightBlack transition-colors">
                            Return to Dashboard
                        </NavLink>
                    </div>

                    <div className="mt-12 pt-8 border-neutral-200 border-t">
                        <p className="text-[11px] text-neutral-500 md:text-xs xl:text-sm">
                            We appreciate your patience as we work to improve our loan services.
                            Thank you for choosing Commerce Bank USA.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pending;