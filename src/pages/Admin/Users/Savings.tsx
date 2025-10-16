//Services
import { ErrorScreen } from "@/components/ErrorComponents";
import { ColumnLoader } from "@/components/LoadingScreen";
import { UserSavings } from "@/services/queries.service";
import SavingsTable from "./SavingsTable";

const Savings = ({ userId }: { userId: string }) => {

    const { data, isFetching, isLoading, isError, refetch } = UserSavings(userId);

    if (isLoading || isFetching) return (
        <main className="flex flex-col gap-y-2">
            <ColumnLoader />
        </main>
    )

    if (isError) return <ErrorScreen variant="card" type="500" size="sm" onRetry={refetch} />;

    if (data && data.data) {
        return (
            <main>
                <SavingsTable savings={data.data} />
            </main>
        );
    }
}

export default Savings;