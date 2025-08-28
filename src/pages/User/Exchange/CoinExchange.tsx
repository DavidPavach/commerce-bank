import { useState } from "react";
import { Link } from "react-router-dom";

//Enums and Utils
import { coinMeta } from "@/enums";
import { formatCurrency } from "@/utils/format";

//Components
import Input from "@/components/Input";

//Icons
import { ArrowUp2, Calculator, Wallet } from "iconsax-react";
import { TrendingDown, TrendingUp } from "lucide-react";

const CoinExchange = ({ prices }: { prices: Prices }) => {

    type PriceInfo = Prices[string];

    const [selectedCoin, setSelectedCoin] = useState<{ coin: string; data: PriceInfo }>({ coin: "bitcoin", data: prices["bitcoin"] });
    const [amount, setAmount] = useState<string>('1000');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //Functions
    const toggleOpen = () => setIsOpen((prev) => !prev);

    const calculateAmount = (): number => {
        const value = parseInt(amount) / selectedCoin.data.usd;
        return value;
    }

    return (
        <main className="mt-4 p-4 text-lightBlack">
            <h3 className="font-medium text-base md:text-lg xl:text-xl"><Calculator className="inline mr-1 mb-1 size-5 md:size-6 xl:size-7" />Currency Converter</h3>
            <section className="flex flex-col gap-y-5 mt-4">
                <Input type="number" label="Amount" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" required otherClass="border-gray-300" />
                <div className="relative bg-gray-200 p-3 rounded-2xl">
                    <div onClick={toggleOpen} className="flex justify-between items-center bg-white p-2 rounded-xl cursor-pointer">
                        <div className="flex items-center gap-x-1">
                            <img src={`${coinMeta[selectedCoin.coin].logo}`} alt={`${selectedCoin.coin} logo`} className="size-8 md:size-12 xl:size-14" />
                            <div>
                                <h3 className="font-semibold text-base sm:text-lg md:text-xl xl:text-2xl">{coinMeta[selectedCoin.coin].symbol}</h3>
                                <p className="-mt-1 text-neutral-500 md:text-xs xl:text-sm capitalize text[11px]">{selectedCoin.coin}</p>
                            </div>
                        </div>
                        <div>
                            <p className={`text-[11px] md:text-xs xl:text-sm px-2 py-1 rounded-full w-fit font-semibold ${selectedCoin.data.usd_24h_change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{selectedCoin.data.usd_24h_change >= 0 ? "+" : ""}{selectedCoin.data.usd_24h_change.toFixed(2)}</p>
                            <p className="font-semibold text-primary">{formatCurrency(selectedCoin.data.usd)}</p>
                        </div>
                        <ArrowUp2 variant="Bold" className={`size-4 md:size-5 xl:size-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        {isOpen &&
                            <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-lg mt-2 border border-neutral-200 rounded-lg max-h-80 overflow-y-auto">
                                {Object.keys(prices).map((coin, index) => {
                                    const data = prices[coin];
                                    const meta = coinMeta[coin];

                                    if (!data || !meta) return null;

                                    return (
                                        <button key={index} onClick={() => setSelectedCoin({ coin, data })} className="grid grid-cols-3 hover:bg-neutral-50 px-4 py-3 w-full text-left transition-colors">
                                            <div className="flex items-center">
                                                <img src={meta.logo} alt={`${coin} logo`} className="size-8 md:size-12 xl:size-14" />
                                                <div>
                                                    <h3 className="font-semibold text-sm sm:text-base md:text-lg xl:text-xl">{meta.symbol}</h3>
                                                    <p className="-mt-1 text-[11px] text-neutral-500 md:text-xs xl:text-sm capitalize">{coin}</p>
                                                </div>
                                            </div>
                                            <p className={`text-[11px] md:text-xs xl:text-sm px-2 py-1 rounded-full m-auto h-fit font-semibold ${data.usd_24h_change >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                {data.usd_24h_change >= 0 ? "+" : ""}
                                                {data.usd_24h_change.toFixed(2)}%
                                            </p>
                                            <div>
                                                <p className="font-semibold text-lightBlack text-right">{formatCurrency(data.usd)}</p>
                                                <p className="flex justify-end">
                                                    {data.usd_24h_change >= 0 ? (
                                                        <TrendingUp className="size-4 md:size-5 xl:size-6 text-green-600" />
                                                    ) : (
                                                        <TrendingDown className="size-4 md:size-5 xl:size-6 text-red-600" />
                                                    )}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-r from-primary/5 to-primary/10 my-6 p-4 md:p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-neutral-600">You get</p>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={coinMeta[selectedCoin.coin].logo} alt={`${selectedCoin.coin} image`} className="size-8 md:size-12 xl:size-14" />
                    <span className="font-bold text-primary text-xl md:text-2xl xl:text-3xl">
                        {calculateAmount().toFixed(2)}
                    </span>
                    <span className="text-neutral-600 text-sm md:text-base xl:text-lg">
                        {coinMeta[selectedCoin.coin].symbol}
                    </span>
                </div>
                <p className="mt-2 font-medium text-[11px] text-neutral-600 md:text-xs xl:text-sm">
                    1 {coinMeta[selectedCoin.coin].symbol} = {formatCurrency(selectedCoin.data.usd)} <span className="font-semibold text-primary uppercase">{selectedCoin.coin}</span>
                </p>
            </section>
            <Link to="/user/cryptocurrency" className="flex justify-center items-center space-x-2 hover:bg-primary/5 py-3 border-2 border-primary rounded-2xl w-full font-semibold text-primary transition-colors">
                <Wallet className="size-4 md:size-5 xl:size-6" />
                <span>Withdraw to Your Crypto Wallet</span>
            </Link>
        </main>
    );
}

export default CoinExchange;