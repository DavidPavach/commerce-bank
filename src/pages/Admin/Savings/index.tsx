//Services
import { useAllSavings } from "@/services/queries.service";
import { usePageParam } from "@/Hooks/PageParams";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import PaginationControls from "@/components/Pagination";
import Table from "./Table";

const Index = () => {

    const { page, setPage } = usePageParam();
    const { data, isFetching, isLoading, isError, refetch } = useAllSavings(page.toString(), "30");

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={() => window.history.back()} size="sm" />

    const savings = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    return (
        <main>
            <h1 className="mb-4 text-white">Savings Table</h1>
            <Table savings={savings} />
            {totalPages > 1 && (
                <div className="bg-white mt-4">
                    <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            )}
        </main>
    );
}

export default Index;