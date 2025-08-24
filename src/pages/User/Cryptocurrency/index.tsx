import { useState, useEffect } from "react";

//Stores
import { useUserStore } from "@/stores/userStore";

//Components
import { ColumnLoader } from "@/components/LoadingScreen";
import Form from "./Form";

const Index = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { prices, balance, refetchUserData } = useUserStore();

    useEffect(() => {
        const fetchData = async () => {
            if (!prices || !balance) {
                setLoading(true);
                await Promise.all([refetchUserData()]);
                setLoading(false);
            }
        };

        fetchData();
    }, [balance, prices, refetchUserData])

    if (loading) return (
        <div className="flex flex-col gap-y-2">
            <ColumnLoader />
            <ColumnLoader />
        </div>
    )

    return (
        <main>
            {!loading && prices && balance && <Form prices={prices} balance={balance} />}
        </main>
    );
}

export default Index;