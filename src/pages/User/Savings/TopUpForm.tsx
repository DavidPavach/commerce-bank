import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Stores, Utils and Hooks
import { useUserStore } from "@/stores/userStore";
import { formatCurrency } from "@/utils/format";
import { useTopUpSavings } from "@/services/mutations.service";
import Input from "@/components/Input";
import Button from "@/components/Button";

//Icons
import { X } from "lucide-react";
import { CardSend } from "iconsax-react";

const TopUpForm = ({ onClose, savings }: { onClose: () => void, savings: Savings }) => {

    const { balance } = useUserStore();
    const [amount, setAmount] = useState<string>('');

    //Constants
    const quickAmounts = [500, 1000, 2500, 5000, 10000];
    const remainingAmount = savings.targetAmount
        ? Math.max(0, savings.targetAmount - savings.savedAmount)
        : null;

    //Functions
    const topUpSavings = useTopUpSavings();
    const handleTopUp = () => {

        if (Number(amount) > (balance ?? 0)) return toast.error(`Top-up amount must not be greater than your balance ${formatCurrency(balance ?? 0)}`);
        if (Number(amount) < 0 || Number(amount) === 0) return toast.error("Top-up amount must be greater than zero");
        if (Number(amount) < 100) return toast.error("Top - up amount must be greater than $100 USD");

        toast("Topping up savings...", { isCloseBtn: true });
        topUpSavings.mutate({ savingsId: savings._id, amount: Number(amount) }, {
            onSuccess: () => {
                toast.success(`Successful 🎉, You're building a stronger financial future, one save at a time.`);
                onClose();
            },
            onError: () => {
                toast.error(`Top-up transaction could not be completed, please try again later.`);
            },
        });
    }


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white shadow-2xl rounded-xl w-full max-w-xl overflow-hidden text-black" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 md:p-6 border-neutral-200 border-b">
                    <h2 className="font-semibold text-lightBlack text-xl">Add Funds</h2>
                    <button onClick={onClose} className="hover:bg-neutral-100 p-2 rounded-lg transition-colors">
                        <X size={20} className="text-red-500" />
                    </button>
                </div>
                <div className="p-4 md:p-6">
                    {/* Savings Goal Info */}
                    <div className="bg-primary/5 mb-6 p-4 rounded-lg">
                        <h3 className="mb-2 font-semibold text-lightBlack">{savings.title}</h3>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-600">Current: ${savings.savedAmount.toLocaleString()}</span>
                            {savings.targetAmount && (
                                <span className="font-medium text-primary">
                                    Target: ${savings.targetAmount.toLocaleString()}
                                </span>
                            )}
                        </div>
                        {remainingAmount && (
                            <p className="mt-1 text-accent text-xs">
                                ${remainingAmount.toLocaleString()} remaining to reach goal
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-x-2 my-4">
                        <div className="font-medium text-neutral-600">
                            <CardSend variant="Bulk" size={20} className="inline-flex mr-1 mb-1" />
                            Current Balance
                        </div>
                        <span className="font-bold text-primary text-sm md:text-base xl:text-lg outfit">{formatCurrency(balance ?? 0)}</span>
                    </div>
                    {/* Quick Amount Buttons */}
                    <div>
                        <label className="block mb-2 font-medium text-neutral-600 text-sm">Quick Amounts</label>
                        <div className="gap-2 grid grid-cols-3 sm:grid-cols-5">
                            {quickAmounts.map((quickAmount) => (
                                <button key={quickAmount} type="button" onClick={() => setAmount(quickAmount.toString())} className="hover:bg-primary/5 px-3 py-2 border border-neutral-200 hover:border-primary rounded-2xl font-medium transition-colors">
                                    ${quickAmount}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="my-4">
                        <Input type="number" placeholder="$100.00" label="Amount" id="amount" value={amount} min={100} pattern="[0-9]*" title="Please enter a positive number" required={true} onChange={(e) => { setAmount(e.target.value) }} />
                    </div>
                    <div className="mt-4">
                        <Button onClick={handleTopUp} text="Confirm Top-Up" loadingText="Processing..." variant='primary' size='lg' disabled={topUpSavings.isPending || (balance !== null && Number(amount) > (balance))} loading={topUpSavings.isPending} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default TopUpForm;