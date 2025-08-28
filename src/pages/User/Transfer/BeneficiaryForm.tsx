import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Hooks
import { useCreateBeneficiary } from "@/services/mutations.service";

//Components
import { Textarea } from "@/components/ui/textarea";
import Input from "@/components/Input";
import Button from "@/components/Button";

//Icons
import { X } from "lucide-react";


type beneficiary = {
    fullName: string;
    accountNumber: string;
    bankName: string;
    note?: string;
}

const BeneficiaryForm = ({ closeModal }: { closeModal: () => void; }) => {

    const initialBeneficiaryDetails = {
        fullName: '',
        accountNumber: '',
        bankName: '',
        note: '',
    }

    const [beneficiaryDetails, setBeneficiaryDetails] = useState<beneficiary>(initialBeneficiaryDetails);

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBeneficiaryDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setBeneficiaryDetails(initialBeneficiaryDetails);
    };

    const addBeneficiary = useCreateBeneficiary();
    const handleCreation = () => {

        toast("Adding Beneficiary...", { isCloseBtn: true });
        addBeneficiary.mutate(beneficiaryDetails, {
            onSuccess: () => {
                toast.success(`${beneficiaryDetails.fullName} was successfully added to your beneficiary list.`);
                resetForm();
                closeModal();
            },
            onError: () => {
                toast.error(`Failed to add ${beneficiaryDetails.fullName} to your beneficiary list.`);
            },
        });
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-20 fixed inset-0 flex justify-center items-center bg-black/80 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white shadow-2xl rounded-xl w-full max-w-xl overflow-hidden text-black" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-base md:text-lg xl:text-xl capitalize">Add New Beneficiary </h3>
                        <button type="button" onClick={closeModal} className="hover:text-red-500 duration-300">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Input type="text" label="Full Name" id="fullName" onChange={handleChange} value={beneficiaryDetails.fullName} placeholder="Enter Full Name" otherClass="text-black" required={true} />
                        <Input type="text" label="Account Number" id="accountNumber" onChange={handleChange} value={beneficiaryDetails.accountNumber} placeholder="Enter Account Number" otherClass="text-black" required={true} />
                        <Input type="text" label="Bank Name" id="bankName" onChange={handleChange} value={beneficiaryDetails.bankName} placeholder="Enter Bank Name" otherClass="text-black" required={true} />
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="message">Note (Optional)</label>
                            <Textarea placeholder="Enter Beneficiary Note Here (Optional)." id="message" onChange={handleChange} className="rounded-2xl" />
                        </div>
                    </div>
                    <Button onClick={handleCreation} text="Add Beneficiary" loadingText="Adding..." variant='primary' size='lg' disabled={addBeneficiary.isPending} loading={addBeneficiary.isPending} />
                    <div className="flex justify-between items-center mt-8 hover:text-red-500 text-sm duration-300">
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default BeneficiaryForm;