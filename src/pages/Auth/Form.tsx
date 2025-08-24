import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

//Schemas
import { createSchema, CreateInput } from '@/schema/create.schema';
import { loginSchema, LoginInput } from "@/schema/login.schema";

//Lib and Hooks
import { setTokens } from '@/lib/token';
import { useRegisterUser, useAuthUser } from '@/services/mutations.service';

//Component
import ZodInput from "@/components/ZodInput";
import Button from '@/components/Button';
import ErrorText from '@/components/ErrorText';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CountryPhoneInput from "./CountryDropDown";

//Images
import Logo from "/logo.png";

//Icons
import { Eye, CheckCircle, EyeClosed } from "lucide-react";

export default function AuthPage() {

    //States and Hooks
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [accepted, setAccepted] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [country, setCountry] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const navigate = useNavigate();

    // Data validation with Zod and React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateInput | LoginInput>({
        resolver: zodResolver(isLogin ? loginSchema : createSchema),
        reValidateMode: "onBlur"
    });


    //Functions
    const toggleShow = () => setShow((prev) => !prev)
    const handlePhoneChange = (data: { code: string; name: string; phone_code: string; phoneNumber: string }) => {
        setCountry(data.name)
        setPhoneNumber(data.phoneNumber)
    };

    //Framer Motion Variants
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

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    }

    // TanStack Query mutation for user creation
    const registerUser = useRegisterUser();
    const authUser = useAuthUser();

    // Form submission handler
    const onSubmit: SubmitHandler<CreateInput | LoginInput> = (data) => {
        if (isLogin) {
            // Login logic
            authUser.mutate(data as LoginInput, {
                onSuccess: (response) => {
                    toast.success(response.message);
                    navigate(`/validate?email=${data.email.toLowerCase()}`);
                    reset();
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Login failed. Please check your credentials.";
                    toast.error(message);
                    reset();
                },
            });
        } else {
            if (!accepted) return toast.error("Kindly agree to our terms.")
            // Register logic
            registerUser.mutate({ ...(data as CreateInput), country, phoneNumber }, {
                onSuccess: (response) => {
                    setTokens(response.data.accessToken);
                    toast.success(response.data.message || "Your account was created successfully!");
                    navigate('/verification');
                    reset();
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message || "Registration failed. Please check your credentials.";
                    toast.error(message);
                    reset();
                },
            });
        }
    };


    const disableButton = registerUser.isPending || authUser.isPending


    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-8 text-center">
                <motion.div className="inline-flex justify-center items-center bg-white mb-4 p-3 rounded-full size-12 md:size-14 xl:size-16"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <img src={Logo} alt="Commerce Bank USA" />
                </motion.div>
                <h1 className="font-bold text-slate-900 text-lg md:text-xl xl:text-2xl">Commerce Bank USA</h1>
                <p className="mt-1 text-slate-600">Secure Banking Solutions</p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <div>
                    <div className="space-y-1 pb-4">
                        <div className="flex justify-center items-center space-x-1 mb-4">
                            <motion.button onClick={() => setIsLogin(true)}
                                className={`px-6 py-2 rounded-3xl font-medium transition-all ${isLogin ? "text-white shadow-lg" : "text-slate-600 hover:text-slate-900"
                                    }`} style={{ backgroundColor: isLogin ? "#1D9B5E" : "transparent" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                Sign In
                            </motion.button>
                            <motion.button onClick={() => setIsLogin(false)}
                                className={`px-6 py-2 rounded-3xl font-medium transition-all ${!isLogin ? "text-white shadow-lg" : "text-slate-600 hover:text-slate-900"
                                    }`} style={{ backgroundColor: !isLogin ? "#1D9B5E" : "transparent" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                Sign Up
                            </motion.button>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div key={isLogin ? "login" : "signup"} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                custom={isLogin ? -1 : 1} transition={{ duration: 0.3 }}>
                                <p className="text-center">
                                    {isLogin ? "Sign in to access your secure banking portal" : "Join Commerce Bank USA for secure banking"}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div>
                        <form className="flex flex-col gap-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                            <AnimatePresence mode="wait">
                                <motion.div key={isLogin ? "login-form" : "signup-form"} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                    custom={isLogin ? -1 : 1} transition={{ duration: 0.3 }} className="space-y-4">
                                    {!isLogin && (
                                        <motion.div variants={itemVariants}>
                                            <div className="flex flex-col">
                                                <ZodInput type="text" placeholder="John Doe" label="Full Name" name="fullName" register={register} required />
                                                {(errors as FieldErrors<CreateInput>).fullName && (
                                                    <ErrorText message={(errors as FieldErrors<CreateInput>).fullName?.message} />
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    <motion.div variants={itemVariants}>
                                        <div className="flex flex-col">
                                            <ZodInput type="email" placeholder="Johndoe@mail.com" label="Email" name="email" register={register} required />
                                            {errors.email && <ErrorText message={errors.email.message} />}
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <div className="relative flex flex-col">
                                            <ZodInput type={show ? "text" : "password"} label='Password' placeholder="Password" name="password" register={register} required={true} />
                                            {errors.password && <ErrorText message={errors.password.message} />}
                                            <div className='top-8 md:top-9 xl:top-11 right-4 absolute cursor-pointer' onClick={toggleShow}>{show ? <Eye size={18} /> : <EyeClosed size={18} />}</div>
                                        </div>
                                    </motion.div>

                                    {!isLogin && (
                                        <motion.div variants={itemVariants}>
                                            <div>
                                                <CountryPhoneInput onChange={handlePhoneChange} />
                                            </div>
                                        </motion.div>
                                    )}

                                    <motion.div variants={itemVariants} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox checked={accepted} onCheckedChange={(checked) => setAccepted(checked === true)} id="remember" className="data-[state=checked]:bg-accent border-neutral-800 data-[state=checked]:border-accent" />
                                            <Label htmlFor="remember" className="text-neutral-800 cursor-pointer">
                                                {isLogin ? "Remember me" : "I agree to the terms"}
                                            </Label>
                                        </div>
                                        {isLogin && (
                                            <motion.a href="/forgot" className="text-white hover:underline" whileHover={{ scale: 1.05 }}>
                                                Forgot password?
                                            </motion.a>
                                        )}
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="mt-4">
                                        <Button text={isLogin ? "Login" : "Submit"} loadingText={isLogin ? "Signing In..." : "Creating Account..."} variant='primary' size='lg' disabled={disableButton} loading={registerUser.isPending || authUser.isPending} />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </form>

                        <motion.div variants={itemVariants} className="bg-slate-50 mt-6 p-3 border border-slate-200 rounded-3xl">
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="flex-shrink-0 mt-0.5 size-4 text-primary" />
                                <div className="text-slate-600 text-xs">
                                    <p className="mb-1 font-medium">Bank-level Security</p>
                                    <p>Your data is protected with 256-bit SSL encryption and multi-factor authentication.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 text-[10px] text-slate-200 md:text-xs xl:text-sm text-center">
                <p>© {new Date().getFullYear()} Commerce Bank USA. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <Link to="/privacy" className="hover:text-black transition-colors">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="hover:text-black transition-colors">
                        Terms of Service
                    </Link>
                    <Link to="/contact" className="hover:text-black transition-colors">
                        Support
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    )
}
