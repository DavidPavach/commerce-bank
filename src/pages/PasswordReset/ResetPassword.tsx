import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";
import { useSearchParams } from "react-router-dom";

//Stores
import { useUserEmailStore } from "@/stores/useEmailStore";

//Components
import { Input } from "@/components/ui/input";
import FancyButton from "@/components/Button";

//Icons
import { Eye, EyeClosed } from "lucide-react";
import { usePasswordReset } from "@/services/mutations.service";

const ResetPassword = () => {

    const { email } = useUserEmailStore();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();

    //Functions
    const clearParam = () => {
        searchParams.delete("page");
        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (!email) clearParam();
    }, [email]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const resetPassword = usePasswordReset();
    const handleSubmit = () => {

        if (!password || password.length < 8) return toast.error("Password must be more than 8 characters.")
        resetPassword.mutate({ email: email!, password }, {
            onSuccess: (response) => {
                toast.success(response.message || "Password reset was successful!");
                clearParam();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Password reset failed, kindly check the entered details.";
                toast.error(message);
            },
        })
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col gap-y-2">
            <div className="relative mt-10">
                <Input id="password" type={showPassword ? "text" : "password"} value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} className="bg-[#F8F6F1] px-4 py-3 rounded-3xl focus:outline-none text-sm md:text-base xl:text-lg duration-300 focus:caret-primary" placeholder="Enter new password" />
                <div className='top-4 md:top-5 right-4 absolute cursor-pointer' onClick={togglePasswordVisibility}>{showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}</div>
            </div>
            {password.length < 8 && <p className="my-4 text-xs md:text-sm">Password must be more than 8 Characters</p>}
            <FancyButton text="Submit" loadingText='Submitting....' variant='primary' size='lg' onClick={() => handleSubmit()} disabled={password.length < 8} loading={resetPassword.isPending} />
        </motion.div>
    );
}

export default ResetPassword;