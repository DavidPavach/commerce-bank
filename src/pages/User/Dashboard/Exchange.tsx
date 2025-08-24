import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Components
import { SkeletonLoader } from "@/components/LoadingScreen";

//Stores and Utils
import { useCurrencyStore } from "@/stores/currencyStore";

//Icons
import { TrendingUp } from "lucide-react";

const Exchange = () => {

    const { currencies, fetchCurrencies } = useCurrencyStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            await Promise.all([
                !currencies && fetchCurrencies(),
            ]);

            setIsLoading(false);
        };

        if (!currencies) {
            fetchData();
        }
    }, [currencies, fetchCurrencies]);

    if (isLoading || !currencies) return <SkeletonLoader lines={3} />;

    const PAIRS = [
        { pair: "GBP", img: "/currencies/GBP.svg", price: currencies.GBP, name: "Pound Sterling" },
        { pair: "JPY", img: "/currencies/JPY.svg", price: currencies.JPY, name: "Japanese Yen" },
        { pair: "EUR", img: "/currencies/EUR.svg", price: currencies.EUR, name: "Euro" },
        { pair: "RUB", img: "/currencies/RUB.svg", price: currencies.RUB, name: "Russian Ruble" },
        { pair: "CAD", img: "/currencies/CAD.svg", price: currencies.CAD, name: "Canadian Dollar" },
    ];

    return (
        <main className="bg-[url(/convertBg.jpg)] bg-cover bg-no-repeat mt-4 p-4 rounded-3xl">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-1 text-primary">
                    <TrendingUp className="size-4 md:size-5 xl:size-6" />
                    <h2 className="font-semibold text-lightBlack text-sm md:text-base xl:text-lg">Exchange Rates</h2>
                </div>
                <Link to="/user/exchange" className="text-primary hover:text-accent duration-300">View More</Link>
            </div>
            <section className="flex flex-col gap-y-2 mt-4">
                {PAIRS.map((pair) => (
                    <div key={pair.pair} className="flex justify-between bg-slate-50 p-4 border border-neutral-200 rounded-2xl">
                        <div className="flex items-center gap-x-3">
                            <img className="border border-neutral-300 rounded-[50%] size-8 md:size-10 xl:size-12" src={pair.img} alt={pair.pair} />
                            <div>
                                <h3 className="font-semibold text-black text-base md:text-lg xl:text-xl">{pair.pair}</h3>
                                <p className="font-medium text-neutral-500 text-xs xl:text-sm">{pair.name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h3 className="font-semibold text-black text-base md:text-lg xl:text-xl">{(pair.price * 1000).toLocaleString()} {pair.pair}</h3>
                            <p className="font-medium text-neutral-500 text-xs xl:text-sm">{(currencies.USD * 1000).toLocaleString()} USD</p>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Exchange;