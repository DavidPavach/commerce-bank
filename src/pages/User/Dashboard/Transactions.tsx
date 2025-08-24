// Hooks
import { GetUserLastFiveTransactions } from "@/services/queries.service";

// Components
import TransactionTable from "@/components/TransactionTable";
import { SkeletonLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";

const Transactions = () => {
  
  const { data, isFetching, isLoading, isError, refetch } = GetUserLastFiveTransactions();

  if (isFetching || isLoading) {
    return <SkeletonLoader lines={4} className="my-4" />;
  }

  if (isError) {
    return <ErrorScreen variant="card" type="500" size="sm" onRetry={refetch} />;
  }

  if (data && data.data) {
    return <TransactionTable transactions={data.data} />;
  }
};

export default Transactions;
