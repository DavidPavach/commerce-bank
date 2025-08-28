import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Stores, Types and Hooks
import { useUserStore } from "@/stores/userStore";
import { Transaction } from "@/types";
import { useEditTransaction } from "@/services/mutations.service";

//Components
import AnimatedProgress from "@/pages/Pending/AnimatedProgress";
import Button from "@/components/Button";

//Icons
import { X } from "lucide-react";

const getLevelPercent = (level: string) => {
    switch (level) {
        case "tax":
            return 25
        case "tac":
            return 50
        case "insurance":
            return 75
        case "done":
            return 100
        default:
            return 25
    }
}

const getLevel = (level: string): string => {
    switch (level) {
        case "tax":
            return "tac"
        case "tac":
            return "insurance"
        case "insurance":
            return "done"
        default:
            return "tax"
    }
}

const PinPage = ({ transaction, onClose }: { transaction: Transaction, onClose: () => void; }) => {

    const { user, refetchUserData } = useUserStore();
    const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
    const [activePin, setActivePin] = useState<number>(0);
    const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

    //As Component Mounts, refetch user data to be upto date
    useEffect(() => {
        refetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Functions
    const handlePinChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);
            if (value && index < 5) {
                setActivePin(index + 1);
                pinRefs.current[index + 1]?.focus();
            }
        }
    };

    const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            setActivePin(index - 1);
            pinRefs.current[index - 1]?.focus();
        }
    };

    const closeModal = () => {
        onClose();
        setPin(["", "", "", "", "", ""]);
    }

    const getPin = (level: string) => {
        switch (level) {
            case "tax":
                return user?.taxPin
            case "tac":
                return user?.tacPin
            case "insurance":
                return user?.insurancePin
            case "done":
                return "done";
            default:
                return user?.taxPin;
        }
    }

    const editTransaction = useEditTransaction();
    const handleUpdate = () => {

        const fullPin = pin.join("");
        if (fullPin.length !== 6) return toast.error("Please enter a complete 6-digit PIN");

        const currentPin = getPin(transaction.level)
        if (currentPin === "done") return toast.info("Your transfer has been successfully initiated. Please wait while we process it.")
        if (currentPin !== fullPin) return toast.error(`Incorrect ${transaction.level} pin, kindly try again.`)

        toast("Initiating Transfer...", { isCloseBtn: true });
        editTransaction.mutate({ transactionId: transaction._id, level: getLevel(transaction.level) }, {
            onSuccess: () => {
                toast.success(`Your transaction is advancing. Please complete your PIN entry.`);
                onClose();
            },
            onError: () => {
                toast.error("Transaction failed. Please check your PIN and try again.");
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#121212] shadow-2xl rounded-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white text-base md:text-lg xl:text-xl capitalize">Enter {transaction.level} PIN</h3>
                        <button type="button" onClick={closeModal} className="text-neutral-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>
                    <AnimatedProgress value={getLevelPercent(transaction.level)} />
                    <p className="font-mono text-[10px] text-primary md:text-xs xl:text-sm text-right animate-pulse">{getLevelPercent(transaction.level)}%</p>
                    <p className="my-6 text-neutral-400">
                        Kindly enter the <span className="font-bold text-primary capitalize">{transaction.level}</span> Pin to continue.
                    </p>
                    <div className="flex justify-center gap-2 mb-6">
                        {pin.map((digit, index) => (
                            <div key={index} className={`w-10 h-12 flex items-center justify-center border ${activePin === index ? "border-primary" : digit ? "border-neutral-600" : "border-neutral-800"} rounded-lg ${digit ? "bg-neutral-300" : "bg-white"}`}>
                                <input ref={(el) => { pinRefs.current[index] = el }} type="password" inputMode="numeric" maxLength={1} value={digit}
                                    onChange={(e) => handlePinChange(index, e.target.value)} onKeyDown={(e) => handlePinKeyDown(index, e)} onFocus={() => setActivePin(index)} className="bg-transparent focus:outline-none w-full h-full text-black text-center" />
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleUpdate} text="Confirm Transfer" loadingText="Processing..." variant='primary' size='lg' disabled={editTransaction.isPending || pin.some((p) => p === "")} loading={editTransaction.isPending} />
                    <div className="flex justify-between items-center mt-8 text-neutral-400 hover:text-white text-sm">
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </motion.div>
        </motion.div >
    );
}

export default PinPage;