import { useState } from 'react';
import { toast } from 'react-fox-toast';

//Utils and Hooks
import { formatCurrency } from '@/utils/format';
import { useDeleteSavings } from '@/services/mutations.service';

//Components
import TopUpForm from './TopUpForm';
import AnimatedProgress from '@/pages/Pending/AnimatedProgress';
import WithdrawalForm from './WithdrawalForm';

//Icons
import { Target, Calendar, DollarSign, TrendingUp, Trash2, CheckCircle, X, Loader } from 'lucide-react';


export default function SavingsGoalCard({ savings }: { savings: Savings }) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<string>("")
    const progressPercentage = savings.targetAmount
        ? Math.min((savings.savedAmount / savings.targetAmount) * 100, 100)
        : 0;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return CheckCircle;
            case 'cancelled': return X;
            default: return Target;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100';
            case 'cancelled': return 'text-red-600 bg-red-100';
            case 'active': return 'text-primary bg-primary/10';
            default: return 'text-neutral-600 bg-neutral-100';
        }
    };

    const StatusIcon = getStatusIcon(savings.status);
    const daysRemaining = savings.endDate
        ? Math.ceil((new Date(savings.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

    const deleteSavings = useDeleteSavings();
    const handleDelete = (savingsId: string) => {

        setIsSubmitting(true);
        toast("Deleting Savings....", { isCloseBtn: true });
        deleteSavings.mutate(savingsId, {
            onSuccess: () => {
                toast.success(`${savings.title}  was deleted successfully.`);
                setIsSubmitting(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(`${error.response.data.message || `Failed to delete ${savings.title}, kindly try again later.`}`);
                setIsSubmitting(false);
            },
        });
    }

    return (
        <>
            {activeForm === "topUp" && <TopUpForm onClose={() => setActiveForm("")} savings={savings} />}
            {activeForm === "withdrawal" && <WithdrawalForm onClose={() => setActiveForm("")} savings={savings} />}
            <div className="bg-white shadow-sm hover:shadow-md p-4 md:p-6 border border-neutral-200 rounded-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`size-10 rounded-full flex items-center justify-center ${getStatusColor(savings.status)}`}>
                            <StatusIcon size={16} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lightBlack text-base md:text-lg xl:text-xl">{savings.title}</h3>
                            <p className="text-neutral-500 capitalize">{savings.status}</p>
                        </div>
                    </div>
                    <button className="hover:bg-neutral-100 p-2 rounded-lg transition-colors">
                        {isSubmitting ? <Loader size={20} className="text-blue-500 animate-spin" /> : <Trash2 onClick={() => handleDelete(savings._id)} size={20} className="text-red-500 hover:text-red-600 duration-300" />}
                    </button>
                </div>

                {/* Progress Section */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-600">Progress</span>
                        <span className="font-medium text-primary">
                            {progressPercentage.toFixed(1)}%
                        </span>
                    </div>
                    <AnimatedProgress value={progressPercentage} />
                </div>

                {/* Amount Section */}
                <div className="gap-4 grid grid-cols-2 mb-4">
                    <div>
                        <p className="mb-1 text-neutral-500 text-xs">Saved Amount</p>
                        <p className="font-bold text-lightBlack text-base md:text-lg xl:text-xl">
                            {formatCurrency(savings.savedAmount)}
                        </p>
                    </div>
                    {savings.targetAmount && (
                        <div>
                            <p className="mb-1 text-neutral-500 text-xs">Target Amount</p>
                            <p className="font-bold text-accent text-base md:text-lg xl:text-xl">
                                {formatCurrency(savings.targetAmount)}
                            </p>
                        </div>
                    )}
                </div>

                {/* Interest Section */}
                <div className="bg-goldenYellow/10 mb-4 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <TrendingUp size={14} className="text-accent" />
                            <span className="font-medium text-lightBlack text-sm">Interest Earned</span>
                        </div>
                        <span className="font-bold text-accent text-sm">
                            {formatCurrency(savings.totalInterestAccrued)}
                        </span>
                    </div>
                    <p className="mt-1 text-neutral-600 text-xs">
                        {savings.interestRate}% APY
                    </p>
                </div>

                {/* Timeline Section */}
                <div className="flex justify-between items-center mb-4 text-neutral-600 text-sm">
                    <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>Started: {new Date(savings.startDate).toLocaleDateString()}</span>
                    </div>
                    {daysRemaining !== null && daysRemaining > 0 && (
                        <span className="font-medium text-primary">
                            {daysRemaining} days left
                        </span>
                    )}
                    {daysRemaining !== null && daysRemaining < 0 && <span className="font-medium text-red-500">
                        Overdue by {Math.abs(daysRemaining)} days
                    </span>}
                    {daysRemaining !== null && daysRemaining === 0 && <span className="font-medium text-accent">
                        Due Today
                    </span>}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button onClick={() => setActiveForm("topUp")} className="flex flex-1 justify-center items-center space-x-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-white transition-colors">
                        <DollarSign size={16} />
                        <span>Add Funds</span>
                    </button>
                    <button onClick={() => setActiveForm("withdrawal")} disabled={savings.status !== "completed"} className="flex-1 hover:bg-neutral-100 disabled:bg-neutral-500 px-4 py-2 border border-neutral-200 rounded-lg text-lightBlack disabled:text-neutral-200 transition-colors disabled:cursor-not-allowed">
                        Withdraw
                    </button>
                </div>
            </div>
        </>
    );
}