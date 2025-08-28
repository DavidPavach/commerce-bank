import { useState, useEffect } from "react";

//Stores
import { useCurrencyStore } from "@/stores/currencyStore";
import { useUserStore } from "@/stores/userStore";

//Components
import FiatExchange from "./FiatExchange";
import CoinExchange from "./CoinExchange";
import FiatDetails from "./FiatDetails";
import CoinDetails from "./CoinDetails";
import { ColumnLoader } from "@/components/LoadingScreen";

//Icons
import { Coin1, DollarSquare } from "iconsax-react";


const Index = () => {

    const [activeTab, setActiveTab] = useState<'fiat' | 'crypto'>('fiat');
    const [loading, setLoading] = useState<boolean>(false);
    const { prices, refetchPrices } = useUserStore();
    const { currencies, fetchCurrencies } = useCurrencyStore()

    useEffect(() => {
        const fetchData = async () => {
            if (!prices || !currencies) {
                setLoading(true);
                await Promise.all([refetchPrices(), fetchCurrencies()]);
                setLoading(false);
            }
        };

        fetchData();
    }, [currencies, fetchCurrencies, prices, refetchPrices]);


    return (
        <main>
            <div>
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">Currency Exchange</h1>
                <p className="text-neutral-400">Convert currencies and cryptocurrencies with real-time rates</p>
            </div>
            <section className="flex lg:flex-row flex-col lg:justify-between gap-5">
                <main className="bg-neutral-100 mt-10 border border-neutral-200 rounded-2xl w-full lg:w-[60%]">
                    <div className="flex mb-4">
                        <button onClick={() => setActiveTab('fiat')}
                            className={`flex-1 px-2 sm:px-4 py-3 text-center transition-colors ${activeTab === 'fiat' ? 'font-semibold text-sm md:text-base xl:text-lg text-primary border-b-2 border-primary bg-primary/5' : 'text-neutral-600 hover:text-primary font-medium'}`}>
                            <DollarSquare className="inline mr-2 size-4 md:size-5 xl:size-6" />
                            Fiat Currencies
                        </button>
                        <button onClick={() => setActiveTab('crypto')} className={`flex-1 px-2 sm:px-4 py-3 text-center transition-colors ${activeTab === 'crypto' ? 'text-primary border-b-2 border-primary bg-primary/5 font-semibold text-sm md:text-base xl:text-lg ' : 'text-neutral-600 hover:text-primary font-medium '}`}>
                            <Coin1 size={20} className="inline mr-2 size-4 md:size-5 xl:size-6" />
                            Cryptocurrencies
                        </button>
                    </div>
                    {loading && <div className="flex flex-col gap-y-2">
                        <ColumnLoader />
                        <ColumnLoader />
                    </div>
                    }
                    {!loading && currencies && activeTab === "fiat" && <FiatExchange currencies={currencies} />}
                    {!loading && prices && activeTab === "crypto" && <CoinExchange prices={prices} />}
                </main>
                <main className="lg:mt-10 w-full lg:w-[35%]">
                    {loading && <ColumnLoader />}
                    {!loading && currencies && activeTab === "fiat" && <FiatDetails currencies={currencies} />}
                    {!loading && prices && activeTab === "crypto" && <CoinDetails prices={prices} />}
                </main>
            </section>

        </main>
    );
}

export default Index;