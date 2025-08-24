import { useState } from "react";

//Hooks and Utils
import { GetUserSavings } from "@/services/queries.service";
import { calculateSavingsSummary } from "@/utils";
import { formatCurrency } from "@/utils/format";

//Components
import { SkeletonLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";

//Icons
import { Eye, EyeSlash } from "iconsax-react";

const Savings = () => {

    const { data, isFetching, isLoading, refetch, isError } = GetUserSavings();
    const [view, setView] = useState<boolean>(false);

    // Functions
    const toggleView = () => setView((prev) => !prev);

    if (isFetching || isLoading) return <SkeletonLoader lines={2} />
    if (isError) return <ErrorScreen variant="card" type="500" size="sm" title='Error' message="Failed to fetch your savings account, kindly try again." onRetry={refetch} />

    return (
        <section className="bg-white p-2 rounded-3xl w-full h-full">
            <main className="relative bg-primaryYellow p-4 rounded-3xl w-full font-medium text-blueBlack">
                <span onClick={toggleView} className="top-4 right-4 absolute cursor-pointer">{view ? <EyeSlash className="size-4 md:size-5 xl:size-6" /> : <Eye className="size-4 md:size-5 xl:size-6" />}</span>
                <div className="flex justify-center items-center text-center">
                    <div className="flex flex-col gap-y-1">
                        <h3 className="font-semibold">Savings Account</h3>
                        <p className="font-semibold text-primary">{view ? `+${ formatCurrency(calculateSavingsSummary(data.data).totalInterest)}` : "****"}</p>
                        <h1 className="font-bold text-4xl xl:text-5xl outfit">{view ? formatCurrency(calculateSavingsSummary(data.data).totalSaved) : "****"}</h1>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-10 mt-4">
                    <p className="font-semibold text-sm md:text-base xl:text-lg">Savings</p>
                    <p>Commerce Bank</p>
                </div>
            </main>
        </section>
    );
}

export default Savings;
