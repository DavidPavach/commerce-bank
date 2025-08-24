import { useState } from "react";

//Hooks and Utils
import { GetUserSavings } from "@/services/queries.service";
import { formatCurrency } from "@/utils/format";

//Components
import SummaryCard from "./SummaryCard";
import { ColumnLoader, SkeletonLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";
import SavingsGoalCard from "./SavingsCard";
import SavingsForm from "./SavingsForm";

//Icons
import { CalendarTick, Cup, DollarSquare, Filter, TrendUp } from "iconsax-react";
import { Target } from "lucide-react";

const SavingsBody = () => {

    const { data, isFetching, isLoading, refetch, isError } = GetUserSavings();
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
    const [create, setCreate] = useState<boolean>(false);

    //Loading
    if (isLoading || isFetching) return <>
        <ColumnLoader />
        <SkeletonLoader lines={6} className="mt-8" />
    </>

    //Error
    if (isError) return <ErrorScreen variant="card" type="500" size="sm" title="Error" message="Failed to fetch your savings account, kindly try again." onRetry={refetch} />

    //No Data returned
    if (!data?.data) return null;

    const fetchedData: Savings[] = data.data;
    const totalSaved = fetchedData.reduce((sum, savings) => sum + savings.savedAmount, 0);
    const totalInterest = fetchedData.reduce((sum, savings) => sum + savings.totalInterestAccrued, 0);
    const activeGoals = fetchedData.filter(s => s.status === 'active').length;
    const completedGoals = fetchedData.filter(s => s.status === 'completed').length;

    const filteredSavings = fetchedData.filter(savings =>
        filterStatus === 'all' || savings.status === filterStatus
    );

    return (
        <>
            {create && <SavingsForm onClose={() => setCreate((prev) => !prev)} />}
            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-8">
                <SummaryCard icon={<DollarSquare variant="Bulk" className="bg-green-100 size-8 md:size-9 xl:size-10 text-primary" />} title="Total Saved" value={formatCurrency(totalSaved)} footerText="Across all goals" classes="text-lightBlack" />
                <SummaryCard icon={<TrendUp variant="Bulk" className="bg-orange-100 size-8 md:size-9 xl:size-10 text-accent" />} title="Interest Earned" value={formatCurrency(totalInterest)} footerText="4.2% APY" classes="text-accent" />
                <SummaryCard icon={<Cup variant="Bulk" className="bg-green-100 size-8 md:size-9 xl:size-10 text-primary" />} title="Active Goals" value={activeGoals} footerText="In Progress" classes="text-primary" />
                <SummaryCard icon={<CalendarTick variant="Bulk" className="bg-green-200 size-8 md:size-9 xl:size-10 text-green-600" />} title="Completed" value={completedGoals} footerText="Goals achieved" classes="text-green-600" />
            </div>
            <div className="bg-white shadow-sm border border-neutral-200 rounded-xl">
                <div className="flex justify-between items-center p-6 border-neutral-200 border-b">
                    <h2 className="font-semibold text-lightBlack text-xl md:text-2xl xl:text-3xl">Your Savings Goals</h2>
                    <div className="flex items-center space-x-2">
                        <Filter size={16} className="text-neutral-600" />
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "completed" | "cancelled")} className="px-3 py-2 border border-neutral-200 focus:border-primary rounded-lg focus:outline-none text-lightBlack">
                            <option value="all">All Goals</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="p-4 md:p-6">
                    {filteredSavings.length > 0 ? (
                        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {filteredSavings.map((savings) => (
                                <SavingsGoalCard key={savings._id} savings={savings} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Target size={48} className="mx-auto mb-4 text-neutral-300" />
                            <h3 className="mb-2 font-medium text-neutral-600 text-lg">
                                {filterStatus === 'all' ? 'No savings goals yet' : `No ${filterStatus} goals`}
                            </h3>
                            <p className="mb-4 text-neutral-500">
                                {filterStatus === 'all'
                                    ? 'Start building your financial future by creating your first savings goal'
                                    : `You don't have any ${filterStatus} savings goals`
                                }
                            </p>
                            {filterStatus === 'all' && (
                                <button onClick={() => setCreate(true)} className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-2xl text-white transition-colors">
                                    Create Your First Goal
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SavingsBody;