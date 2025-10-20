//Utils and Stores
import { formatDate } from "@/utils/format";
import { useUserStore } from "@/stores/userStore";

//Icons
import { AlertTriangle, Mail, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


export default function Index() {

    const { user } = useUserStore();

    return (
        <div className="flex justify-center items-center bg-black p-4 min-h-screen">
            <div className="w-full max-w-4xl">
                <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm p-8 md:p-12 border border-neutral-600/20 rounded-2xl">
                    <div className="mb-8 text-center">
                        <div className="flex justify-center items-center bg-gradient-to-br from-red-500/20 to-orange-500/20 mx-auto mb-6 rounded-2xl size-12 md:size-14 xl:size-20">
                            <AlertTriangle className="size-6 md:size-8 xL:size-10 text-red-400" />
                        </div>

                        <h1 className="mb-4 font-bold text-white text-xl sm:text-2xl md:text-3xl xl:text-4xl">
                            Account Suspended
                        </h1>

                        <p className="text-neutral-300 text-sm md:text-base xl:text-lg">
                            Hello {user && user.fullName || "Customer"}, your account access has been restricted.
                        </p>
                    </div>

                    {/* Suspension Details */}
                    <div className="bg-gradient-to-r from-neutral-600/10 to-neutral-600/5 mb-8 p-6 border border-neutral-600/20 rounded-xl">
                        <h2 className="flex items-center gap-2 mb-4 font-semibold text-white text-xl">
                            <FileText className="size-5 text-primary" />
                            Suspension Details
                        </h2>

                        <div className="space-y-3 text-neutral-200">
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-400">Case ID:</span>
                                <span className="font-mono text-primary">{user && user.accountId}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-neutral-400">Date:</span>
                                <span>{user?.suspendedDate && formatDate(user.suspendedDate)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 font-semibold text-white text-lg">What this means:</h3>
                        <ul className="space-y-2 text-neutral-200">
                            <li className="flex items-center gap-2">
                                <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2"></div>
                                <span>You cannot access your account or use our services</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2"></div>
                                <span>Your funds and data remain secure and protected</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2"></div>
                                <span>This suspension requires review before account restoration</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-6 font-semibold text-white text-lg">Your options:</h3>
                        <div className="bg-gradient-to-r from-blue-500/10 to-primary/10 p-4 border border-blue-500/20 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="size-5 text-blue-400" />
                                <span className="font-semibold text-white">Contact Support</span>
                            </div>
                            <p className="mb-3 text-neutral-300 text-sm">
                                Have questions? Our support team is here to help explain the situation.
                            </p>
                            <Link to={`mailto:support@cbshbank.com?subject=Account Suspension - Case ${user && user.accountId}`}
                                className="font-medium text-blue-400 hover:text-blue-300 text-sm transition-colors">
                                support@cbshbank.com
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-neutral-600/20 border-t text-center">
                        <p className="mb-2 text-neutral-400 text-sm">
                            This action was taken to protect our community and maintain platform integrity.
                        </p>
                        <p className="text-neutral-500 text-xs">
                            Case ID: {user && user.accountId} • Generated on {user?.suspendedDate && formatDate(user.suspendedDate)}
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/auth" className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Login</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
