//Services
import { useGetDepositRequest } from "@/services/queries.service";
import { usePageParam } from "@/Hooks/PageParams";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";
import { Table } from "./Table";
import PaginationControls from "@/components/Pagination";

const Index = () => {

    const { page, setPage } = usePageParam();
    const { data, isFetching, isLoading, isError, refetch } = useGetDepositRequest(page.toString(), "30");

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={() => window.history.back()} size="sm" />

    const depositRequests = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    return (
        <main>
            <h1 className="mb-4 text-white">Card Request Table</h1>
            <Table data={depositRequests} />
            {totalPages > 1 && (
                <div className="bg-white mt-4">
                    <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            )}
        </main>
    );
}

export default Index;