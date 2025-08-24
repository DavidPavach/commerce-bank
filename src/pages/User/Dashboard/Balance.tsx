import { useState, useEffect } from "react";

//Store and Utils
import { useUserStore } from "@/stores/userStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { maskNumber, formatCurrency, formatCryptoAmount } from "@/utils/format";

//Components
import { SkeletonLoader } from "@/components/LoadingScreen";

//Icons
import { Eye, EyeSlash } from "iconsax-react";


const Balance = () => {

    const { user, balance, refetchUserData } = useUserStore();
    const { currencies, fetchCurrencies } = useCurrencyStore();
    const [view, setView] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            await Promise.all([
                !currencies && fetchCurrencies(),
                refetchUserData()
            ]);

            setIsLoading(false);
        };

        if (!user || !balance || !currencies) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, balance, currencies]);

    // Functions
    const toggleView = () => setView((prev) => !prev);

    if(isLoading) return <SkeletonLoader lines={2} />

    return (
        <section className="bg-white p-2 rounded-3xl w-full h-full">
                <main className="relative bg-primaryYellow p-4 rounded-3xl w-full font-medium text-blueBlack">
                    <span onClick={toggleView} className="top-4 right-4 absolute cursor-pointer">{view ? <EyeSlash className="size-4 md:size-5 xl:size-6" /> : <Eye className="size-4 md:size-5 xl:size-6" />}</span>
                    <div className="flex justify-center items-center text-center">
                        <div className="flex flex-col gap-y-1">
                            <h3 className="font-semibold">Checking Account</h3>
                            <p>1 USD ≈ <span className="font-semibold text-primary">EUR {currencies && formatCryptoAmount(currencies.EUR)}</span>  ≈ <span className="font-semibold text-primary">GBR {currencies && formatCryptoAmount(currencies.GBP)}</span> </p>
                            <h1 className="font-bold text-4xl xl:text-5xl outfit">{view ? formatCurrency(balance ?? 0) : "****"}</h1>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-10 mt-4">
                        <p className="font-semibold text-sm md:text-base xl:text-lg">{maskNumber(user?.accountNumber ?? "0000000000")}</p>
                        <p>Commerce Bank</p>
                    </div>
                </main>
        </section>
    );
}

export default Balance;