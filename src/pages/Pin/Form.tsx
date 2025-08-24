import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";
import { useNavigate } from "react-router-dom";

//Services and Utils
import { useUpdateUserProfile } from "@/services/mutations.service";
import { isSequentialPin } from "@/utils/format";

//Component
import Button from "@/components/Button";

//Icons
import { Lock1 } from "iconsax-react";

const Form = ({ email }: { email: string }) => {

    const [newPin, setNewPin] = useState<string>('');
    const [loading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    //Functions
    const reset = () => {
        setNewPin("")
        setIsLoading(false);
    }


    const updateUserDetails = useUpdateUserProfile();
    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        
        //Make sure the Pin is upto 6 Digits and not Sequential
        if (newPin.length < 6) return toast.warning("Your new pin must be six(6) digits");
        if (isSequentialPin(newPin)) return toast.warning("This PIN is too weak. Please avoid sequential numbers.");

        setIsLoading(true);

        const payload = { email, transferPin: newPin };
        updateUserDetails.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Your Transfer Pin was updated successfully!")
                navigate("/pending");
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't update your Transfer pin now, kindly try again later.";
                toast.error(message);
                reset();
            },
        })
    };

    return (
        <main className="mt-10 text-neutral-100">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-y-6 bg-lightBlack px-6 py-8 rounded-2xl w-full">
                <div className="text-center">
                    <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">Enter New Transfer PIN</h2>
                    <p className="mt-1 text-neutral-400">Please enter a new PIN to facilitate secure Transfers.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="newPin" className="font-medium">New Transfer PIN</label>
                        <input id="newPin" type="text" inputMode="numeric" value={newPin} placeholder="123456"
                            onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setNewPin(digitsOnly);
                            }}
                            className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg capitalize duration-300 focus:caret-primary" required />
                    </div>

                    <Button icon={<Lock1 size="20" variant="Bold" />} loading={loading} disabled={loading} text="Submit" variant="success" />
                </form>
            </motion.div>
        </main>
    );
};

export default Form;
