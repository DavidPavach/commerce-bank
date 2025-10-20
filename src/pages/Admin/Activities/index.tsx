//Services
import { useAllActivities, useCurrentAdmin } from "@/services/queries.service";
import { usePageParam } from "@/Hooks/PageParams";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import PaginationControls from "@/components/Pagination";
import { ActivityTable } from "./Table";
import Unauthorised from "@/components/Unauthorised";


const Index = () => {

    const { page, setPage } = usePageParam();
    const { data, isFetching, isLoading, isError, refetch } = useAllActivities(page.toString(), "30");
    const { data: adminData, isError: adminError } = useCurrentAdmin();

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError || adminError) return <ErrorScreen onRetry={refetch} onGoBack={() => window.history.back()} size="sm" />

    const admin = adminData?.data;
    const activities = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    return (
        <>
            {admin.role === "admin" ?
                <Unauthorised />
                :
                <main>
                    <h1 className="mb-4 text-white">Activities Table</h1>
                    <ActivityTable data={activities} />
                    {totalPages > 1 && (
                        <div className="bg-white mt-4">
                            <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        </div>
                    )}
                </main>
            }
        </>
    );
}

export default Index;