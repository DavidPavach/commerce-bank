import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//Hooks and Utils
import { GetDepositRequests } from "@/services/queries.service";
import { formatCurrency } from "@/utils/format";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import SummaryCard from "./SummaryCard";
import DepositCard from "./DepositCard";
import Form from "./Form";

//Icons
import { CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react";
import { AddSquare, Receipt21 } from "iconsax-react";
import { ErrorScreen } from "@/components/ErrorComponents";

const Index = () => {

    const navigate = useNavigate();
    const { data, isLoading, isFetching, isError, refetch } = GetDepositRequests();
    const [activeTab, setActiveTab] = useState<"deposits" | "new">("deposits");

    //Functions
    const goBack = () => {
        navigate(-1);
    };

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={goBack} size="sm" />

    if (data && data.data !== undefined) return (
        <main>
            <header>
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">Deposit Management</h1>
                <p className="text-neutral-400">Manage your Commerce Bank USA deposit requests</p>
            </header>
            <section className="gap-2 sm:gap-5 grid grid-cols-2 lg:grid-cols-4 mt-10">
                <SummaryCard title="Total Deposits" iconClasses="bg-[#1D9B5E]/10" icon={<TrendingUp className="size-4 md:size-5 xl:size-6 text-[#1D9B5E]" />} value={data.data.length} />
                <SummaryCard title="Successful" iconClasses="bg-green-100" icon={<CheckCircle className="size-4 md:size-5 xl:size-6 text-green-600" />} value={data.data.filter((d: Deposits) => d.status === "successful").length} />
                <SummaryCard title="Pending" iconClasses="bg-yellow-100" icon={<Clock className="size-4 md:size-5 xl:size-6 text-yellow-600" />} value={data.data.filter((d: Deposits) => d.status === "pending").length} />
                <SummaryCard title="Total Amount" iconClasses="bg-[#1D9B5E]/10" icon={<DollarSign className="size-4 md:size-5 xl:size-6 text-[#1D9B5E]" />} value={formatCurrency(data.data.filter((d: Deposits) => d.status === "successful").reduce((sum: number, d: Deposits) => sum + d.amount, 0))} />
            </section>
            <section className="mt-10">
                <div className="flex bg-white mx-auto mb-4 rounded-2xl max-w-2xl">
                    <button onClick={() => setActiveTab('deposits')}
                        className={`flex-1 px-2 sm:px-4 py-3 text-center transition-colors ${activeTab === 'deposits' ? 'font-semibold text-sm md:text-base xl:text-lg text-primary bg-primary/10' : 'text-neutral-600 hover:text-primary font-medium'}`}>
                        <Receipt21 className="inline mr-2 mb-0.5 size-4 md:size-5 xl:size-6" />
                        My Deposits
                    </button>
                    <button onClick={() => setActiveTab('new')} className={`flex-1 px-2 sm:px-4 py-3 text-center transition-colors ${activeTab === 'new' ? 'text-primary bg-primary/10 font-semibold text-sm md:text-base xl:text-lg ' : 'text-neutral-600 hover:text-primary font-medium '}`}>
                        <AddSquare size={20} className="inline mr-2 mb-0.5 size-4 md:size-5 xl:size-6" />
                        New Request
                    </button>
                </div>
            </section>
            <section className="mt-10">
                {activeTab === "deposits" && <DepositCard deposits={data.data} />}
                {activeTab === "new" && <Form />}
            </section>
        </main>
    );

    return null;
}

export default Index;