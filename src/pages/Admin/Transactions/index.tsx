import { useNavigate } from 'react-router-dom';

//Hooks
import { usePageParam } from "@/Hooks/PageParams";
import { GetTransactions } from "@/services/queries.service";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import Table from './Table';
import PaginationControls from '@/components/Pagination';

const Index = () => {

    const navigate = useNavigate();
    const { page, setPage } = usePageParam();
    const { data, isLoading, isFetching, isError, refetch } = GetTransactions(String(page), "20");

    const transactions = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

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

    if (data) return (
        <main>
            <h1 className="mb-4 text-white">Transactions Table</h1>
            <Table transactions={transactions} />
            {totalPages > 1 && (
                <div className="mt-4">
                    <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            )}
        </main>
    );

    return null;
}

export default Index;