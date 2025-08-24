import { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

//Services
import { useResendVerification, useVerifyUser } from "@/services/mutations.service";

// Components
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Button from "@/components/Button";

const Form = () => {
    
    // States
    const [value, setValue] = useState("");
    const [timer, setTimer] = useState(180);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    //Functions
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const reset = () => {
        setCanResend(false);
        setTimer(180);
    }

    // TanStack Query mutation for user verification and resending of verification code
    const verifyUser = useVerifyUser()
    const resendVerification = useResendVerification();

    const handleVerification = () => {
        toast("Verifying your account...", { isCloseBtn: true });
        verifyUser.mutate({ verificationCode: value }, {
            onSuccess: (response) => {
                toast.success(response.message || "Your account was verified successfully!");
                navigate('/kyc');
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Account verification failed, kindly try again later.";
                toast.error(message, { isCloseBtn: true });
            },
        });
    }

    const handleResend = () => {
        reset();
        toast("Resending Verification Email...", { isCloseBtn: true });
        resendVerification.mutate(undefined, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Verification Email was resent successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Couldn't resend verification email, kindly try again later.";
                toast.error(message, { isCloseBtn: true });
            },
        });
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="flex flex-col gap-y-6 mt-8 text-center">
                <p className="text-neutral-700 cursor-pointer">Enter the 6 Digit Verification Code</p>
                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup>
                            <InputOTPSlot className="border-accent" index={0} />
                            <InputOTPSlot className="border-accent" index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className="border-accent" index={2} />
                            <InputOTPSlot className="border-accent" index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot className="border-accent" index={4} />
                            <InputOTPSlot className="border-accent" index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="mt-2">
                    {value === "" ? (
                        <p>Enter the six(6) digit verification code.</p>
                    ) : (
                        <p className="text-sm md:text-base xl:text-lg">You entered: {value}</p>
                    )}
                </div>
                <Button text="Verify Account" loadingText="Verifying Account...." variant="primary" size="lg" loading={verifyUser.isPending} disabled={verifyUser.isPending} onClick={handleVerification} />
            </div>
            <div className="mt-4 text-gray-600 text-sm">
                {canResend ? (
                    <button type="button" onClick={handleResend} className="text-black hover:text-white underline hover:scale-105 duration-300">
                        Resend verification email
                    </button>
                ) : (
                    <p>You can resend in {formatTime(timer)}</p>
                )}
            </div>
                </motion.div>
    );
};

export default Form;
