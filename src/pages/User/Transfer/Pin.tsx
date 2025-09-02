import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { toast } from "react-fox-toast";


//Stores, Hooks, Utils and Types
import { useUserStore } from "@/stores/userStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { useCreateTransaction } from "@/services/mutations.service";
import { formatCurrency } from "@/utils/format";
import { Transaction } from "@/types";

//Components
import PinPage from "./PinPage";
import Button from "@/components/Button";

//Icons
import { X } from "lucide-react";


const Pin = ({ onClose }: { onClose: () => void; }) => {

    const navigate = useNavigate();
    const { user, balance } = useUserStore();
    const { transaction, resetTransaction } = useTransactionStore();
    const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
    const [activePin, setActivePin] = useState<number>(0);
    const [transferPinsPage, setTransferPinsPage] = useState<boolean>(false);
    const [newTransaction, setNewTransaction] = useState<Transaction>();
    const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

    //Functions
    useEffect(() => {
        if (!user) {
            toast.error("Something Went Wrong, Kindly Restart the Process")
            navigate(-1);
        }
    }, [navigate, user])

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
    };

    const createTransaction = useCreateTransaction()
    const handleTransfer = () => {

        if (transaction.amount > (balance ?? 0)) return toast.error(`Entered amount ${formatCurrency(transaction.amount)} is bigger than what is available $${balance}.`)

        const fullPin = pin.join("");
        if (fullPin.length !== 6) return toast.error("Please enter a complete 6-digit PIN");
        if (user?.transferPin !== fullPin) return toast.error("Incorrect Transfer Pin, kindly try again")

        toast("Initiating Transfer...", { isCloseBtn: true });
        createTransaction.mutate(transaction, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Your Transfer was initiated successfully!");
                setNewTransaction(response.data.data)
                setTransferPinsPage(true);
                resetTransaction()
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Transfer failed, kindly try again later.";
                toast.error(message);
            },
        });
    }

    return (
        <AnimatePresence>
            {transferPinsPage && newTransaction ? (
                <PinPage transaction={newTransaction} onClose={() => setTransferPinsPage(false)} />
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4" onClick={closeModal}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#121212] shadow-2xl rounded-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white text-base md:text-lg xl:text-xl">Enter Transfer PIN</h3>
                                <button type="button" onClick={closeModal} className="text-neutral-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="mb-6 text-neutral-400">
                                Please enter your 6-digit transfer PIN to confirm the transfer of <span className="font-bold text-primary">{formatCurrency(transaction.amount)}</span>
                            </p>
                            <div className="flex justify-center gap-2 mb-6">
                                {pin.map((digit, index) => (
                                    <div key={index} className={`w-10 h-12 flex items-center justify-center border ${activePin === index ? "border-primary" : digit ? "border-neutral-600" : "border-neutral-800"} rounded-lg ${digit ? "bg-neutral-300" : "bg-white"}`}>
                                        <input ref={(el) => { pinRefs.current[index] = el }} type="password" inputMode="numeric" maxLength={1} value={digit}
                                            onChange={(e) => handlePinChange(index, e.target.value)} onKeyDown={(e) => handlePinKeyDown(index, e)} onFocus={() => setActivePin(index)} className="bg-transparent focus:outline-none w-full h-full text-black text-center" />
                                    </div>
                                ))}
                            </div>
                            <Button onClick={handleTransfer} text="Confirm Transfer" loadingText="Processing..." variant='primary' size='lg' disabled={createTransaction.isPending || pin.some((p) => p === "")} loading={createTransaction.isPending} />
                            <div className="flex justify-between items-center mt-8 text-neutral-400 hover:text-white text-sm">
                                <button type="button" onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Pin;