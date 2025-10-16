//Services
import { useCurrentAdmin } from "@/services/queries.service";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from '@/components/ErrorComponents';
import Profile from "./Profile";

const Index = () => {

    const { data, isFetching, isLoading, isError, refetch } = useCurrentAdmin();

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={() => window.history.back()} size="sm" />

    const admin = data?.data;

    return (
        <Profile admin={admin} />
    );
}

export default Index;