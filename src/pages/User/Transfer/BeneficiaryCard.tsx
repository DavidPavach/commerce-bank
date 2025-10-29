import { toast } from "react-fox-toast";

//Stores, Utils and Hooks
import { useTransactionStore } from "@/stores/transactionStore";
import { formatDate, maskNumber } from '@/utils/format';
import { useDeleteBeneficiary } from "@/services/mutations.service";

//Icons
import { User, Building2, CheckCircle, Trash2, Loader } from 'lucide-react';


export default function BeneficiaryCard({ beneficiary }: { beneficiary: Beneficiary }) {

    const { updateDetails } = useTransactionStore();


    //Functions
    const handleClick = (beneficiary: Beneficiary) => {
        const data = {
            fullName: beneficiary.fullName,
            accountNumber: beneficiary.accountNumber,
            bankName: beneficiary.bankName,
            recipient: beneficiary._id
        }
        updateDetails({ ...data })
    }

    const deleteBeneficiary = useDeleteBeneficiary();
    const handleDelete = (id: string) => {

        toast("Removing Beneficiary...", { isCloseBtn: true });
        deleteBeneficiary.mutate(id, {
            onSuccess: () => {
                toast.success(`Beneficiary was removed successfully.`);
            },
            onError: () => {
                toast.error(`Failed to remove beneficiary from your list, please try again later.`);
            },
        });
    }

    return (
        <div onClick={() => handleClick(beneficiary)} className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md border-neutral-200 hover:border-primary/50`}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                    <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                        <User size={16} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lightBlack">{beneficiary.fullName}</h3>
                        {beneficiary.note && (
                            <p className="text-neutral-500 text-sm">"{beneficiary.note}"</p>
                        )}
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <CheckCircle size={16} className="text-primary" />
                    {deleteBeneficiary.isPending ? <Loader size={16} className="text-blue-600 animate-spin" /> :
                        <Trash2 onClick={() => handleDelete(beneficiary._id)} size={16} className="text-red-500 hover:text-red-600" />}
                </div>
            </div>
            <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                    <Building2 size={14} className="text-neutral-400" />
                    <span className="text-neutral-600">{beneficiary.bankName}</span>
                </div>
                <p className="text-neutral-500">
                    {maskNumber(beneficiary.accountNumber)} • Checking
                </p>
                {beneficiary.createdAt && (
                    <p className="text-neutral-400 text-xs">Added on: {formatDate(beneficiary.createdAt)}</p>
                )}
            </div>
        </div>
    );
}