import { useState } from "react";

//Services
import { useAdmins, useCurrentAdmin } from "@/services/queries.service";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import Unauthorised from "@/components/Unauthorised";
import { Button } from "@/components/ui/button";
import Form from "./Form";
import Table from "./Table";
import Management from "./Management";

//Icons
import { BadgePlus, CircleCheckBig } from "lucide-react";

const Index = () => {

    const { data, isFetching, isLoading, isError, refetch } = useAdmins();
    const { data: adminData, isError: adminError } = useCurrentAdmin();
    const [selectedAccount, setSelectedAccount] = useState<Admin | null>(null);
    const [newPage, setNewPage] = useState<boolean>(false);

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError || adminError) return <ErrorScreen onRetry={refetch} onGoBack={() => window.history.back()} size="sm" />

    const admin = adminData?.data;
    const admins = data?.data || [];

    //Functions
    const togglePage = () => setNewPage((prev) => !prev);

    const handleViewMore = (admin: Admin) => {
        setSelectedAccount(admin);
    };

    const clearSelected = () => {
        setSelectedAccount(null);
    };

    return (
        <>
            {
                admin.role === "admin" ? <Unauthorised /> :
                    selectedAccount ? <Management admin={selectedAccount} onClose={clearSelected} /> :
                        <main>
                            <div className="flex justify-between items-center my-4">
                                <h1 className="text-white">Staff Table</h1>
                                <Button disabled={newPage} onClick={togglePage} className="bg-primary hover:bg-primary/90 py-3 text-white">
                                    {newPage ? <CircleCheckBig className="mr-1 size-5" /> : <BadgePlus className="mr-1 size-5" />}
                                    {newPage ? "Adding Staff..." : "New Staff"}
                                </Button>
                            </div>
                            {newPage ? <Form onClose={togglePage} /> :
                                <Table admins={admins} handleViewMore={handleViewMore} />
                            }
                        </main>
            }
        </>
    );
}

export default Index;