//Hooks
import { usePageParam } from "@/Hooks/PageParams";
import { useGetUserTransactions } from "@/services/queries.service";

//Components
import PaginationControls from "@/components/Pagination";
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";
import UserTable from "./UserTable";

const Transactions = ({ userId }: { userId: string }) => {

    const { page, setPage } = usePageParam();
    const { data, isLoading, isError, isFetching, refetch } = useGetUserTransactions({ page: page.toString(), limit: "10", userId });

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen variant="card" type="500" size="sm" onRetry={refetch} />;

    const transactions = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    if (data && data.data) {
        return (
            <main>
                <UserTable transactions={transactions} />
                {totalPages > 1 && (
                    <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                )}
            </main>
        );
    }
}

export default Transactions;