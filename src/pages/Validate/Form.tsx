import { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";

//Services
import { useValidateUser } from "@/services/mutations.service";

// Components
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Button from "@/components/Button";


const Form = () => {

    // States
    const [value, setValue] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    //Take the user back to login page if there is no email
    useEffect(() => {
        const checkEmail = () => {
            const email = searchParams.get("email");
            if (!email) {
                navigate('/auth');
            } else {
                setEmail(email);
            }
        };

        checkEmail();
    }, [navigate, searchParams]);


    // TanStack Query mutation for user validation
    const validateUser = useValidateUser()

    const handleValidation = () => {
        toast("Validating your authentication...", { isCloseBtn: true });
        validateUser.mutate({ email, otp: value }, {
            onSuccess: (response) => {
                toast.success(response.message || "Your login was validated successfully!");
                navigate(`/${response.data.redirect}`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Validation failed, kindly try again later.";
                toast.error(message, { isCloseBtn: true });
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="flex flex-col gap-y-6 mt-8 text-center">
                <p className="text-neutral-700 cursor-pointer">Enter the 6 Digit Authentication Validation Code</p>
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
                <Button text="Validate Login" loadingText="Validating Login..." variant="primary" size="lg" loading={validateUser.isPending} disabled={validateUser.isPending}
                    onClick={handleValidation} />
            </div>
        </motion.div>
    );
};

export default Form;
