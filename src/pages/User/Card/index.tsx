import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hooks and Store
import { GetCardRequest } from "@/services/queries.service";
import { useUserStore } from '@/stores/userStore';

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";
import { BankCard } from "./Card";
import Form from './Form';
import Pending from './Pending';
import Declined from './Declined';

const Index = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { user, refetchUserData } = useUserStore();
    const { data, isLoading, isFetching, isError, refetch } = GetCardRequest();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(true);
                await Promise.all([refetchUserData()]);
                setLoading(false);
            }
        };

        fetchData();
    }, [refetchUserData, user])

    //Functions
    const goBack = () => {
        navigate(-1);
    };

    if ((isLoading || isFetching) || loading) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen onRetry={refetch} onGoBack={goBack} size="sm" />

    if (!loading && data && user) return (
        <main>
            {data.data !== null && data.data.status === "successful" && <BankCard email={user.email} cardNumber={data.data.cardNumber} cardType='credit' variant={user.freezeCard ? "dark" : "primary"} holderName={user.fullName} expiryDate={data.data.cardExpiryDate} cvv={data.data.cardCVV} freezeCard={user.freezeCard} />}

            {data.data !== null && data.data.status === "pending" && <Pending card={data.data} />}

            {data.data !== null && data.data.status === "declined" && <Declined card={data.data} />}
            {data.data === null && <Form />}
        </main>
    );

    return null;
}

export default Index;