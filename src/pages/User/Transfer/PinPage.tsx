import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";
import { Link } from "react-router-dom";

//Stores, Types and Hooks
import { getUserDetailsFn } from "@/services/api.service";
import { Transaction } from "@/types";
import { useEditTransaction } from "@/services/mutations.service";
import { formatCurrency } from "@/utils/format";

//Components
import AnimatedProgress from "@/pages/Pending/AnimatedProgress";
import Button from "@/components/Button";

//Icons
import { Lock, Shield } from "iconsax-react";
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

    const [editableTx, setEditableTx] = useState<Transaction>(transaction);
    const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
    const [activePin, setActivePin] = useState<number>(0);
    const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const editTransaction = useEditTransaction();
    const handleUpdate = async () => {
        try {
            const fullPin = pin.join("");
            if (fullPin.length !== 6) return toast.error("Please enter a complete 6-digit PIN");

            toast.info("Verifying Pin...", { isCloseBtn: true });

            // Fetch current user details
            const data = await getUserDetailsFn();
            const user = data.data

            const getPin = (level: string) => {
                switch (level) {
                    case "tax":
                        return user?.taxPin;
                    case "tac":
                        return user?.tacPin;
                    case "insurance":
                        return user?.insurancePin;
                    case "done":
                        return "done";
                    default:
                        return user?.taxPin;
                }
            };

            const currentPin = getPin(editableTx.level);
            if (currentPin === "done")
                return toast.info("Your transfer has been successfully initiated. Please wait while we process it.");
            if (currentPin !== fullPin)
                return toast.error(`Incorrect ${editableTx.level} pin, kindly try again.`);

            toast("Initiating Transfer...", { isCloseBtn: true });
            editTransaction.mutate(
                { transactionId: editableTx._id, level: getLevel(editableTx.level) },
                {
                    onSuccess: () => {
                        toast.success(`Your transaction is advancing. Please complete your PIN entry.`);
                        setEditableTx(prev => ({ ...prev, level: getLevel(editableTx.level) }));
                        setPin(["", "", "", "", "", ""]);
                    },
                    onError: () => {
                        toast.error("Transaction failed. Please check your PIN and try again.");
                        setPin(["", "", "", "", "", ""]);
                    },
                }
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.message || "Failed to fetch user details. Please try again.");
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white shadow-2xl rounded-xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="text-sm">
                    <div className="bg-primary mb-6 p-4 md:p-6 text-white">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <Shield variant="Bulk" className="size-5" />
                                </div>
                                <div>
                                    {editableTx.level !== "done" ?
                                        <h1 className="font-semibold text-lg md:text-xl xl:text-2xl capitalize">{editableTx.level} PIN Verification</h1> :
                                        <h1 className="font-semibold text-lg md:text-xl xl:text-2xl capitalize">PIN Verification Complete</h1>}
                                    <p className="text-white/90">
                                        Secure transaction authentication
                                    </p>
                                </div>
                            </div>
                            <X className="size-5 hover:text-red-600 cursor-pointer" onClick={closeModal} />
                        </div>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="flex justify-between items-center mb-2 text-neutral-500">
                            <p>Progress</p>
                            <p>{getLevelPercent(editableTx.level)}%</p>
                        </div>
                        <AnimatedProgress value={getLevelPercent(editableTx.level)} />
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="bg-neutral-50 p-4 md:p-6 rounded-lg">
                            <h4 className="font-semibold text-neutral-900">Transfer Details</h4>
                            <div className="flex justify-between mt-2">
                                <span className="text-neutral-600">Amount</span>
                                <span className="font-semibold text-primary">
                                    {formatCurrency(editableTx.amount)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-600">Recipient</span>
                                <span className="font-semibold text-neutral-900">{editableTx.details.fullName}</span>
                            </div>
                        </div>
                        {editableTx.level !== "done" &&
                            <div className="mt-4 text-center">
                                <p className="font-medium text-neutral-700">Enter Your 6-Digit <span className="uppercase">{editableTx.level}</span> PIN</p>
                                <p className="text-neutral-600">
                                    Please enter your <span className="uppercase">{editableTx.level}</span> PIN to authorize this transaction securely.
                                </p>
                            </div>
                        }
                        {editableTx.level !== "done" &&
                            <div className="flex justify-center gap-2 my-6">
                                {pin.map((digit, index) => (
                                    <div key={index} className={`size-12 flex items-center justify-center border-2 ${activePin === index ? "border-primary" : digit ? "border-neutral-600" : "border-neutral-800"} rounded-lg ${digit ? "bg-green-200" : "bg-white"}`}>
                                        <input ref={(el) => { pinRefs.current[index] = el }} type="password" inputMode="numeric" maxLength={1} value={digit}
                                            onChange={(e) => handlePinChange(index, e.target.value)} onKeyDown={(e) => handlePinKeyDown(index, e)} onFocus={() => setActivePin(index)} className="bg-transparent focus:outline-none w-full h-full text-black text-center" />
                                    </div>
                                ))}
                            </div>
                        }
                        <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <Lock className="flex-shrink-0 mt-0.5 size-5 text-blue-600" />
                                <div>
                                    <h4 className="mb-1 font-semibold text-blue-800 text-sm">Secure Transaction</h4>
                                    {editableTx.level !== "done" ? <p className="text-blue-700 text-xs">
                                        Your <span className="uppercase">{editableTx.level}</span> PIN is encrypted and used only for transaction verification. Never share your PIN with
                                        anyone.
                                    </p> :
                                        <p className="text-blue-700 text-xs">
                                            Your have successfully completed all Pin Verification
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        {editableTx.level !== "done" ?
                            <Button onClick={handleUpdate} text="Confirm Transfer" loadingText="Processing..." variant='primary' size='lg' disabled={editTransaction.isPending || pin.some((p) => p === "")} loading={editTransaction.isPending} /> :
                            <Link className="bg-black hover:bg-accent px-8 py-4 rounded-[2rem] text-white hover:text-black text-sm md:text-base xl:text-lg duration-300" to="/user/history">Your Transactions</Link>
                        }
                    </div>
                </div>
            </motion.div>
        </motion.div >
    );
}

export default PinPage;