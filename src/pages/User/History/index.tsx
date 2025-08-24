import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//Hooks, Types
import { GetAllTransactions } from "@/services/queries.service";
import { Transaction } from "@/types";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";
import TransactionTable from "@/components/TransactionTable";
import PaginationControls from "@/components/Pagination";

const Index = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get the value of the "page" parameter
    const page = searchParams.get('page') ?? "1";

    const { data, isLoading, isError, isFetching, refetch } = GetAllTransactions(page, "20");

    const transactions: Transaction[] = data?.data?.data || [];
    const totalPages: number = data?.data?.pagination?.pages || 1;

    //Function
    const updatePage = (newPage: string) => {
        if (newPage !== page && parseInt(newPage) > 1 && parseInt(newPage) <= totalPages) {
            setSearchParams({ page: newPage });
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    if (isLoading || isFetching) return (
        <div className="flex flex-col gap-y-5">
            <ColumnLoader />
            <ColumnLoader />
        </div>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={goBack} size="sm" />

    if (transactions) return (
        <main className='flex flex-col gap-y-5'>
            <div>
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">Transaction History</h1>
                <p className="text-neutral-400">View and manage all your account transactions</p>
            </div>
            <TransactionTable transactions={transactions} />
            {totalPages > 1 && <PaginationControls currentPage={parseInt(page)} totalPages={totalPages} onPageChange={() => updatePage}  />}
        </main>
    );

    return null;
}

export default Index;