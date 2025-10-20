import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hooks
import { usePageParam } from "@/Hooks/PageParams";
import { GetTransactions } from "@/services/queries.service";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import Table from './Table';
import PaginationControls from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import Form from './Form';

//Icons
import { BadgePlus, CircleCheckBig } from 'lucide-react';

const Index = () => {

    const navigate = useNavigate();
    const [newPage, setNewPage] = useState<boolean>(false)
    const { page, setPage } = usePageParam();
    const { data, isLoading, isFetching, isError, refetch } = GetTransactions(String(page), "20");

    const transactions = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    //Functions
    const goBack = () => {
        navigate(-1);
    };

    const togglePage = () => {
        setNewPage((prev) => !prev);
    }

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={goBack} size="sm" />

    if (data) return (
        <main>
            <div className="flex justify-between items-center my-4">
                <h1 className="mb-4 text-white">Transactions Table</h1>
                <Button disabled={newPage} onClick={togglePage} className="bg-primary hover:bg-primary/90 py-3 text-white">
                    {newPage ? <CircleCheckBig className="mr-1 size-5" /> : <BadgePlus className="mr-1 size-5" />}
                    {newPage ? "Adding Transaction..." : "New Transaction"}
                </Button>
            </div>
            {newPage ? <Form onClose={togglePage} /> :
                <>
                    <Table transactions={transactions} />
                    {totalPages > 1 && (
                        <div className="mt-4">
                            <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        </div>
                    )}
                </>
            }
        </main>
    );

    return null;
}

export default Index;