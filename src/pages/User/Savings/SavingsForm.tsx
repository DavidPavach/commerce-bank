import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Stores and Hooks
import { useUserStore } from "@/stores/userStore";
import { useCreateSavings } from "@/services/mutations.service";

//Components
import Input from "@/components/Input";
import ErrorText from "@/components/ErrorText";
import Button from "@/components/Button";

//Icons
import { Info, X } from "lucide-react";
import { Calendar } from "iconsax-react";


const SavingsForm = ({ onClose }: { onClose: () => void; }) => {

    const { balance } = useUserStore();
    const [formData, setFormData] = useState<SavingsFormData>({
        title: '',
        targetAmount: '',
        savedAmount: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
    });
    const [errors, setErrors] = useState<Partial<SavingsFormData>>({});

    //Functions
    const handleChange = (field: keyof SavingsFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            targetAmount: '',
            savedAmount: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: '',
        });
        setErrors({});
    }


    const validateForm = () => {
        const newErrors: Partial<SavingsFormData> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Goal title is required';
        }

        if (formData.targetAmount && parseFloat(formData.targetAmount) <= 0) {
            newErrors.targetAmount = 'Target amount must be greater than 0';
        }

        if (formData.savedAmount && parseFloat(formData.savedAmount) < 0) {
            newErrors.savedAmount = 'Initial amount cannot be negative';
        }

        if (formData.targetAmount && formData.savedAmount) {
            const target = parseFloat(formData.targetAmount);
            const saved = parseFloat(formData.savedAmount);
            if (saved > target) {
                newErrors.savedAmount = 'Initial amount cannot exceed target amount';
            }
        }

        if (parseFloat(formData.savedAmount) > (balance ?? 0)) {
            newErrors.savedAmount = 'Initial amount cannot exceed current balance';
        }

        if (formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
            newErrors.endDate = 'End date must be after start date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createSavings = useCreateSavings();
    const handleSavings = () => {

        if (!validateForm()) return toast.error("Kindly correct all errors before proceeding")
        toast("Creating Savings Goal...", { isCloseBtn: true });

        const transformedData = {
            ...formData, targetAmount: parseFloat(formData.targetAmount), savedAmount: parseFloat(formData.targetAmount),
            startDate: new Date(formData.startDate).toISOString(),
            endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
        }
        createSavings.mutate( transformedData, {
            onSuccess: () => {
                toast.success(`Successful 🎉, You're building a stronger financial future, one save at a time.`);
                resetForm();
                onClose();
            },
            onError: () => {
                toast.error(`Failed to add new savings goal, please try again later.`);
            },
        });
    }


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white shadow-2xl rounded-xl w-full max-w-xl overflow-hidden text-black" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 md:p-6 border-neutral-200 border-b">
                    <h2 className="font-semibold text-lightBlack text-base md:text-lg xl:text-xl">Create Savings Goal</h2>
                    <button onClick={onClose} className="hover:bg-neutral-100 p-2 rounded-lg transition-colors">
                        <X size={20} className="text-red-500" />
                    </button>
                </div>
                <div className="flex flex-col gap-y-3 p-4 md:p-6">
                    <div className="flex flex-col gap-y-1">
                        <Input type="text" required={true} value={formData.title} onChange={(e) => handleChange('title', e.target.value)} otherClass={`${errors.title ? 'border-red-300' : 'border-neutral-200'}`} placeholder="Emergency Fund, Vacation, New Car" label="Goal Title" />
                        {errors.title && <ErrorText message={errors.title} />}
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Input type="number" min={0} value={formData.targetAmount} onChange={(e) => handleChange('targetAmount', e.target.value)} otherClass={`${errors.targetAmount ? 'border-red-300' : 'border-neutral-200'}`} placeholder="100.00" label="Target Amount (Optional)" />
                        {errors.targetAmount && <ErrorText message={errors.targetAmount} />}
                        <p className="mt-1 text-neutral-500 text-xs">Leave empty for open-ended savings</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Input type="number" min={0} required={true} value={formData.savedAmount} onChange={(e) => handleChange('savedAmount', e.target.value)} otherClass={`${errors.savedAmount ? 'border-red-300' : 'border-neutral-200'}`} placeholder="100.00" label="Initial Deposit (Optional)" />
                        {errors.savedAmount && <ErrorText message={errors.savedAmount} />}
                    </div>
                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                        <div>
                            <label className="block mb-2 font-medium text-neutral-600">
                                <Calendar size={16} className="inline mr-2" />
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input type="date" required value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} className="px-4 py-3 border border-neutral-200 focus:border-primary rounded-2xl focus:outline-none w-full" />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-neutral-600">
                                Target Date (Optional)
                            </label>
                            <input type="date" value={formData.endDate} onChange={(e) => handleChange('endDate', e.target.value)} min={formData.startDate}
                                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-primary ${errors.endDate ? 'border-red-300' : 'border-neutral-200'
                                    }`} />
                            {errors.endDate && <ErrorText message={errors.endDate} />}
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-blue-50 p-4 border border-blue-200 rounded-lg">
                        <Info size={16} className="flex-shrink-0 mt-0.5 text-blue-600" />
                        <div className="text-sm">
                            <p className="font-medium text-blue-800">High-Yield Savings</p>
                            <p className="text-blue-600">Fixed savings will earn 4.4% APY, while Open-ended savings will earn 4.0% APY both with daily compounding interest.</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button onClick={handleSavings} text="Create Savings Goal" loadingText="Processing..." variant='primary' size='lg' disabled={createSavings.isPending} loading={createSavings.isPending} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SavingsForm;