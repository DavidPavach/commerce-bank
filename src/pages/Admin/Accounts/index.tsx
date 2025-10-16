import { useState } from "react";

//Services and Hooks
import { useAllAccounts } from "@/services/queries.service";
import { usePageParam } from "@/Hooks/PageParams";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import PaginationControls from "@/components/Pagination";
import Management from "./Management";
import Table from "./Table";
import { Button } from "@/components/ui/button";

//Icons
import { BadgePlus, CircleCheckBig } from "lucide-react";
import Form from "./Form";

const Index = () => {

    const { page, setPage } = usePageParam();
    const [newPage, setNewPage] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null);
    const { data, isFetching, isLoading, isError, refetch } = useAllAccounts(page.toString(), "30");

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={() => window.history.back()} size="sm" />

    const accounts = data?.data?.data || [];
    const totalPages = data?.data?.pagination?.pages || 1;

    //Functions
    const handleViewMore = (account: AccountDetails) => {
        setSelectedAccount(account);
    };

    const clearSelected = () => {
        setSelectedAccount(null);
    };

    const togglePage = () => {
        setNewPage((prev) => !prev);
    }

    return (
        <>
            {
                selectedAccount ? <Management account={selectedAccount} onClose={clearSelected} /> :
                    <main>
                        <div className="flex justify-between items-center my-4">
                            <h1 className="text-white">Accounts Table</h1>
                            <Button disabled={newPage} onClick={togglePage} className="bg-primary hover:bg-primary/90 py-3 text-white">
                                {newPage ? <CircleCheckBig className="mr-1 size-5" /> : <BadgePlus className="mr-1 size-5" />}
                                {newPage ? "Adding Account..." : "New Account"}
                            </Button>
                        </div>
                        {newPage ? <Form onClose={togglePage} /> :
                            <>
                                <Table accounts={accounts} handleViewMore={handleViewMore} />
                                {totalPages > 1 && (
                                    <div className="bg-white mt-4">
                                        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                                    </div>
                                )}
                            </>
                        }
                    </main>
            }
        </>
    );
}

export default Index;