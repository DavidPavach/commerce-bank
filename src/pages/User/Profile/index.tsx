import { useNavigate } from 'react-router-dom';

//Hooks
import { GetUserDetails } from "@/services/queries.service";

//Components
import Profile from "./Profile";
import { ColumnLoader } from '@/components/LoadingScreen';
import { ErrorScreen } from '@/components/ErrorComponents';

const Index = () => {

    const navigate = useNavigate();
    const { data, isLoading, isFetching, isError, refetch } = GetUserDetails();

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

    if (data && data.data !== null) return (<Profile user={data.data} />);

    return null;
}

export default Index;