import { useEffect } from "react";
import { motion } from "framer-motion";

//Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

//Stores and Services
import { useUserStore } from "@/stores/userStore";
import { GetUserDetails } from "@/services/queries.service";

//Component
import ErrorDisplay from "@/components/Error";

//Icons
import { Clock, Shield, CheckCircle, Mail, FileText, AlertCircle, Headphones } from "lucide-react";
import AnimatedProgress from "./AnimatedProgress";

const Index = () => {

    const { user, setUser } = useUserStore();
    const { data, isError, refetch } = GetUserDetails();
    const progress = user?.kyc?.status === "accepted" ? 75 : 50;

    const verificationSteps = [
        { title: "Application Received", description: "Your application has been submitted successfully", completed: true },
        { title: "Document Review", description: "We're reviewing your submitted documents", completed: true },
        {
            title: "Identity Verification",
            description: "Verifying your identity and personal information",
            completed: user?.kyc?.status === "accepted",
            current: user?.kyc?.status !== "accepted",
        },
        { title: "Final Approval", description: "Final review and account activation", completed: false, current: user?.kyc?.status === "accepted" },
    ]

    //Use Effect for the User data
    useEffect(() => {
        if (!user && data?.data) {
            setUser(data.data);
        }
    }, [data, user, setUser]);

    //Variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <main>
            {isError &&
                <ErrorDisplay onRetry={refetch} isFullPage={false} title="Failed to Load Page" message="We couldn't load your Page. Click below to try again." retryLabel="Reload" />
            }

            <div className="flex justify-center items-center bg-brand-gradient p-4 min-h-dvh">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-4xl">
                    <motion.div variants={itemVariants} className="mb-8 text-center">
                        <motion.div className="inline-flex justify-center items-center bg-primary mb-6 rounded-full size-12 md:size-16 xl:size-20" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                            <Clock className="size-6 md:size-8 xl:size-10 text-white" />
                        </motion.div>
                        <h1 className="mb-2 font-bold text-slate-900 text-xl md:text-2xl xl:text-3xl">Account Verification in Progress</h1>
                        <p className="text-slate-600 text-sm md:text-base xl:text-lg">We're reviewing your application and documents</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                        <Card className="bg-white/80 shadow-xl backdrop-blur-sm border-0">
                            <CardHeader className="pb-4 text-center">
                                <div className="flex justify-center items-center mb-4">
                                    <Badge className="bg-primary px-4 py-2 font-medium text-white text-sm">
                                        <Clock className="mr-2 size-4" />
                                        Verification Pending
                                    </Badge>
                                </div>
                                <CardTitle className="text-slate-900 text-sm md:text-base xl:text-xl">Your Application is Being Reviewed</CardTitle>
                                <CardDescription>
                                    Thank you for choosing Commerce Bank USA. Our team is carefully reviewing your application to ensure the
                                    highest level of security.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Verification Progress</span>
                                        <span className="font-medium" style={{ color: "#1D9B5E" }}>
                                            {progress}% Complete
                                        </span>
                                    </div>
                                    <AnimatedProgress value={progress} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="mb-4 font-semibold text-slate-900">Verification Process</h3>
                                    {verificationSteps.map((step, index) => (
                                        <motion.div key={index} variants={itemVariants} className="flex items-start space-x-4 bg-slate-50 p-4 border border-slate-200 rounded-lg">
                                            <div className="flex-shrink-0 mt-1">
                                                {step.completed ? (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 }}>
                                                        <CheckCircle className="size-5 text-primary" />
                                                    </motion.div>
                                                ) : step.current ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}>
                                                        <div className="border-2 border-primary border-t-transparent rounded-full size-5" />
                                                    </motion.div>
                                                ) : (
                                                    <div className="border-2 border-slate-300 rounded-full size-5" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-medium ${step.completed || step.current ? "text-slate-900" : "text-slate-500"}`}>
                                                    {step.title}
                                                </h4>
                                                <p className={`text-sm ${step.completed || step.current ? "text-slate-600" : "text-slate-400"}`}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div variants={itemVariants} className="bg-green-50 p-4 border-2 border-primary border-dashed rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <AlertCircle className="size-5 text-primary" />
                                        <div>
                                            <h4 className="font-medium text-slate-900">Expected Timeline</h4>
                                            <p className="text-slate-600 text-sm">
                                                Verification typically takes 1-3 business days. We'll notify you via email once complete.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="gap-4 grid md:grid-cols-2 mb-6">
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/80 shadow-lg backdrop-blur-sm border-0 h-full">
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <Mail className="size-5 text-blue-600" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">Stay Updated</h3>
                                    </div>
                                    <p className="mb-4 text-slate-600 text-sm">
                                        We'll send you email updates at each step of the verification process.
                                    </p>
                                    <div className="text-slate-500 text-xs">Check your email regularly, including spam folder</div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/80 shadow-lg backdrop-blur-sm border-0 h-full">
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-purple-100 p-2 rounded-lg">
                                            <Shield className="size-5 text-purple-600" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">Secure Process</h3>
                                    </div>
                                    <p className="mb-4 text-slate-600 text-sm">
                                        Your information is protected with bank-level security during verification.
                                    </p>
                                    <div className="text-slate-500 text-xs">256-bit SSL encryption & secure document handling</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                        <Card className="bg-white/80 shadow-lg backdrop-blur-sm border-0">
                            <CardContent className="p-4 md:p-6">
                                <h3 className="flex items-center mb-4 font-semibold text-slate-900">
                                    <FileText className="mr-2 size-5 text-primary" />
                                    What Happens Next?
                                </h3>
                                <div className="space-y-3 text-slate-600 text-sm">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2" />
                                        <p>Our verification team will review your submitted documents and information</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2" />
                                        <p>You'll receive an email notification once verification is complete</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2" />
                                        <p>Upon approval, you'll gain full access to your Commerce Bank USA account</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 bg-primary mt-2 rounded-full size-2" />
                                        <p>If additional information is needed, we'll contact you directly</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-8 text-neutral-100 text-sm text-center">
                        <p className="mb-2">Need immediate assistance? Our support team is available 24/7</p>
                        <div className="flex justify-center space-x-6">
                            <a href="mailto:support@commercebankusa.com" className="flex items-center space-x-1 hover:text-neutral-800 transition-colors">
                                <Headphones className="size-4" />
                                <span>Support Center</span>
                            </a>
                            <a href="mailto:support@commercebankusa.com" className="flex items-center space-x-1 hover:text-neutral-800 transition-colors">
                                <Mail className="size-4" />
                                <span>Email Support</span>
                            </a>
                        </div>
                        <p className="mt-4 text-xs">© {new Date().getFullYear()} Commerce Bank USA. All rights reserved.</p>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}

export default Index;