import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

//Hooks
import { useLoginAdmin } from "@/services/mutations.service";

//Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

//Icons
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";

export default function Index() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    //Functions
    const reset = () => {
        setEmail("");
        setPassword("")
    }

    const loginAdmin = useLoginAdmin()
    const handleSubmit = () => {

        toast("Authenticating...", { isCloseBtn: true });
        const data: { email: string, password: string } = { email, password }

        loginAdmin.mutate(data, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Login was successfully!");
                reset();
                if (searchParams.has("redirect")) {
                    const page = searchParams.get("redirect")
                    navigate(`${page}`);
                } else {
                    navigate('/admin/transactions')
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Login Failed, kindly try again later.";
                toast.error(message, { isCloseBtn: true });
            },
        })
    }

    return (
        <div className={`min-h-dvh bg-brand-gradient flex items-center justify-center p-4 md:p-6`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg">
                <Card className="bg-white/95 shadow-2xl backdrop-blur-sm border-0">
                    <CardHeader className="pt-8 pb-8 text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="flex justify-center items-center bg-primary mx-auto mb-6 rounded-full size-12 md:size-14 xl:size-16">
                            <Shield className="size-6 md:size-7 xl:size-8 text-white" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                            <h1 className="font-bold text-slate-900 text-lg md:text-xl xl:text-2xl">Welcome Back</h1>
                            <p className="text-slate-600">Sign in to CBSH Bank</p>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-2">
                                <Label htmlFor="email" className="font-medium text-slate-700">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="top-1/2 left-3 absolute size-4 md:size-5 text-slate-400 -translate-y-1/2 transform" />
                                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 border-slate-200 focus:border-[#1D9B5E] focus:ring-[#1D9B5E] h-10 md:h-11 xl:h-12" required />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="space-y-2">
                                <Label htmlFor="password" className="font-medium text-slate-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="top-1/2 left-3 absolute size-4 md:size-5 text-slate-400 -translate-y-1/2 transform" />
                                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10 pl-10 border-slate-200 focus:border-[#1D9B5E] focus:ring-[#1D9B5E] h-10 md:h-11 xl:h-12" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="top-1/2 right-3 absolute text-slate-400 hover:text-slate-600 transition-colors -translate-y-1/2 transform">
                                        {showPassword ? <EyeOff className="size-5 md:size-6" /> : <Eye className="size-5 md:size-6" />}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}>
                                <Button disabled={loginAdmin.isPending || !email || !password} onClick={handleSubmit}
                                    className="bg-primary disabled:opacity-50 hover:shadow-lg w-full h-12 font-semibold text-white text-base transition-all duration-200">
                                    {loginAdmin.isPending ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="border-2 border-white border-t-transparent rounded-full size-4 animate-spin" />
                                            <span>Signing In...</span>
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 text-center">
                    <p className="text-neutral-100 text-xs">Protected by CBSH Bank security protocols</p>
                </motion.div>
            </motion.div>
        </div >
    )
}
