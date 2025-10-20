import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// Services and Hooks
import { GetAllUsers } from "@/services/queries.service";
import { usePageParam } from "@/Hooks/PageParams";

// Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import Table from "./Table";
import PaginationControls from "@/components/Pagination";
import UserManagement from "./UserManagement";

const Index = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const { page, setPage } = usePageParam();
    const userEmailParam = searchParams.get("user");

    const { data, isFetching, isLoading, isError, refetch } = GetAllUsers(page.toString(), "30");

    const users = useMemo(() => data?.data?.data || [], [data]);
    const totalPages = data?.data?.pagination?.pages || 1;

    const selectedUser = useMemo(() => {
        if (!userEmailParam) return null;
        return users.find(
            (u: User) => u.email.toLowerCase() === userEmailParam.toLowerCase()
        );
    }, [userEmailParam, users]);

    const handleViewMore = (user: User) => {
        const params = new URLSearchParams(searchParams);
        params.set("user", user.email);
        setSearchParams(params);
    };

    const clearSelected = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("user");
        setSearchParams(params);
    };

    if (isLoading || isFetching) {
        return (
            <main className="flex flex-col gap-y-2">
                <ColumnLoader />
                <ColumnLoader />
            </main>
        );
    }

    if (isError) {
        return (
            <ErrorScreen
                onRetry={refetch}
                onGoBack={() => navigate(-1)}
                size="sm"
            />
        );
    }

    return (
        <>
            {selectedUser ? (
                <UserManagement user={selectedUser} onClose={clearSelected} />
            ) : (
                <main>
                    <h1 className="mb-4 text-white">Users Table</h1>
                    <Table users={users} handleViewMore={handleViewMore} />
                    {totalPages > 1 && (
                        <div className="bg-white mt-4">
                            <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        </div>
                    )}
                </main>
            )}
        </>
    );
};

export default Index;