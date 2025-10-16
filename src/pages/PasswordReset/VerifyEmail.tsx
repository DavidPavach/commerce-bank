import { useEffect, useState } from 'react';
import { toast } from "react-fox-toast";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

//Stores and Hooks
import { useUserEmailStore } from '@/stores/useEmailStore';
import { useVerifyPasswordResetOTP } from '@/services/mutations.service';

//Components
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Button from '@/components/Button';

const VerifyEmail = () => {

    // States and Stores
    const { email } = useUserEmailStore();
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    //Functions
    const clearParam = () => {
        searchParams.delete("page");
        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (!email) clearParam();
    }, [email]);

    const verifyOTP = useVerifyPasswordResetOTP();
    const handleSubmit = () => {

        if (!value || value.length !== 6) return toast.error("Kindly enter the OTP that was sent to your email.")
        verifyOTP.mutate({ email: email!, otp: value }, {
            onSuccess: (response) => {
                toast.success(response.message || "You were verified successfully!");
                searchParams.set("page", "reset");
                setSearchParams(searchParams);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Verification failed, kindly check the entered details.";
                toast.error(message);
            },
        })
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
                <Button text="Verify" loadingText='Verifying...' variant='primary' size='lg' onClick={() => handleSubmit()} disabled={value.length !== 6} loading={verifyOTP.isPending} />
            </div>
        </motion.div>
    );
}

export default VerifyEmail;