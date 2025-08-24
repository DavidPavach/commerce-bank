import { useParams, useNavigate } from 'react-router-dom';

//Hooks and Types
import { GetTransactionDetails } from '@/services/queries.service';

//Components
import { ColumnLoader } from '@/components/LoadingScreen';
import { ErrorScreen } from '@/components/ErrorComponents';
import ReceiptPage from './Receipt';

const Index = () => {

    const { transactionId } = useParams();
    const navigate = useNavigate();

    if (!transactionId) {
        navigate(-1);
        return null;
    }

    const { data, isFetching, isLoading, isError, refetch } = GetTransactionDetails(transactionId);
    
    //Loading Screen
    if (isLoading || isFetching) return (
        <div className='flex flex-col gap-y-3'>
            <ColumnLoader />
            <ColumnLoader />
        </div>
    )

    //Error Screen
    if (isError) return <ErrorScreen type="404" title='Transaction Not Found' message="The transaction details you're looking for doesn't exist or has been moved." size="md" variant='fullscreen' onRetry={refetch} />

    //Data Rendering Page
    if (data && data.data !== undefined) return <ReceiptPage transaction={data.data} />

    return null;
}

export default Index;