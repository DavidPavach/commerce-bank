import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Stores, Utils and Hooks
import { useUserStore } from "@/stores/userStore";
import { formatCurrency } from "@/utils/format";
import { useWithdrawSavings } from "@/services/mutations.service";

//Components
import Input from "@/components/Input";
import Button from "@/components/Button";

//Icons
import { X } from "lucide-react";
import { CardSend } from "iconsax-react";


const WithdrawalForm = ({ onClose, savings }: { onClose: () => void, savings: Savings }) => {

    const { balance } = useUserStore()
    const [amount, setAmount] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    //Constants
    const quickAmounts = [500, 1000, 2500, 5000, 10000];

    //Functions
    const withdrawSavings = useWithdrawSavings();
    const handleWithdrawal = () => {

        if (Number(amount) < 0 || Number(amount) === 0) return toast.error("Withdrawal amount must be greater than zero");
        if (Number(amount) < 100) return toast.error("Withdrawal amount must be greater than $100 USD");

        setIsSubmitting(true);
        toast("Processing Withdrawal...", { isCloseBtn: true });
        withdrawSavings.mutate({ savingsId: savings._id, amount: Number(amount) }, {
            onSuccess: () => {
                toast.success(`Successful 🎉, Your withdrawal was successful.`);
                setIsSubmitting(false);
                onClose();
            },
            onError: () => {
                toast.error(`Withdrawal could not be completed, please try again later.`);
                setIsSubmitting(false);
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white shadow-2xl rounded-xl w-full max-w-xl overflow-hidden text-black" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 md:p-6 border-neutral-200 border-b">
                    <h2 className="font-semibold text-lightBlack text-xl">Withdraw Funds</h2>
                    <button onClick={onClose} className="hover:bg-neutral-100 p-2 rounded-lg transition-colors">
                        <X size={20} className="text-red-500" />
                    </button>
                </div>
                <div className="p-4 md:p-6">
                    <div className="flex items-center gap-x-2 mb-4">
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
                        <Button onClick={handleWithdrawal} text="Confirm Withdrawal" loadingText="Processing..." variant='primary' size='lg' disabled={isSubmitting} loading={isSubmitting} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default WithdrawalForm;