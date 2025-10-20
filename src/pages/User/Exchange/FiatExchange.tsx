import { useState } from "react";

//Enums
import { currencyData, CurrencyNames } from "@/enums";

//Components
import Input from "@/components/Input";

//Icons
import { Calculator, ArrowUp2, ArrowSwapVertical, ArrowSwapHorizontal } from "iconsax-react";
import { Search } from "lucide-react";

const FiatExchange = ({ currencies }: { currencies: Currencies }) => {

    const [fromCurrency, setFromCurrency] = useState<keyof typeof CurrencyNames>("USD");
    const [toCurrency, setToCurrency] = useState<keyof typeof CurrencyNames>("GBP");
    const [amount, setAmount] = useState<string>('1000');
    const [openTab, setOpenTab] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    //Functions
    const switchCurrency = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    const toggleTab = (tab: string) => {
        if (openTab === tab) {
            setOpenTab("");
        } else {
            setOpenTab(tab);
        }
    };

    const filteredCurrencies = currencyData.filter(currency =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCurrencySelect = (tab: "to" | "from", currency: CurrencyInfo) => {
        if (tab === "to") {
            setToCurrency(currency.code)
        } else if (tab === "from") {
            setFromCurrency(currency.code)
        }
        toggleTab(tab)
        setSearchTerm('');
    };

    const handleCalculation = (): number => {

        const rate = currencies[toCurrency] / currencies[fromCurrency]
        return rate * parseFloat(amount);
    }

    return (
        <main className="mt-4 p-4 text-lightBlack">
            <h3 className="font-medium text-base md:text-lg xl:text-xl"><Calculator className="inline mr-1 mb-1 size-5 md:size-6 xl:size-7" />Currency Converter</h3>
            <section className="relative flex flex-col gap-y-5 mt-4">
                <Input type="number" label="Amount" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" required otherClass="border-gray-300" />
                <div className="relative flex md:flex-row flex-col md:justify-between gap-y-5 bg-gray-200 p-3 rounded-2xl">
                    <div onClick={() => toggleTab("from")} className="relative flex justify-between items-center bg-white p-2 md:p-3 xl:p-4 rounded-xl w-full md:w-[45%] cursor-pointer">
                        <div className="flex items-center gap-x-2">
                            <img src={`/currencies/${fromCurrency}.svg`} alt={`${fromCurrency} flag`} className="rounded-[50%] size-6 md:size-8 xl:size-10" />
                            <div className="text-left">
                                <p className="font-medium text-base md:text-lg xl:text-xl">{fromCurrency}</p>
                                <p className="-mt-1 text-neutral-500">{CurrencyNames[fromCurrency]}</p>
                            </div>
                        </div>
                        <ArrowUp2 variant="Bold" className={`size-4 md:size-5 xl:size-6 transition-transform duration-300 ${openTab === "from" ? "rotate-180" : ""}`} />
                        {openTab === "from" &&
                            <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-lg mt-2 border border-neutral-200 rounded-lg max-h-80 overflow-hidden">
                                <div className="p-3 border-neutral-200 border-b">
                                    <div className="relative">
                                        <Search size={16} className="top-1/2 left-3 absolute text-neutral-400 -translate-y-1/2 transform" />
                                        <input type="text" placeholder="Search currencies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="py-2 pr-4 pl-10 border border-neutral-200 focus:border-primary rounded-lg focus:outline-none w-full placeholder:text-xs md:placeholder:text-sm xl:placeholder:text-base" />
                                    </div>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {filteredCurrencies.map((currency) => (
                                        <button key={currency.code} onClick={() => handleCurrencySelect("from", currency)} className="flex items-center space-x-3 hover:bg-neutral-50 px-4 py-3 w-full text-left transition-colors">
                                            <img src={`/currencies/${currency.code}.svg`} alt={`${currency.code} flag`} className="rounded-[50%] size-6 md:size-8 xl:size-10" />
                                            <div>
                                                <p className="font-semibold text-lightBlack">{currency.code}</p>
                                                <p className="text-neutral-500 text-sm">{currency.name}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div onClick={() => toggleTab("to")} className="relative flex justify-between items-center bg-white p-2 md:p-3 xl:p-4 rounded-xl w-full md:w-[45%] cursor-pointer">
                        <div className="flex items-center gap-x-2">
                            <img src={`/currencies/${toCurrency}.svg`} alt={`${toCurrency} flag`} className="rounded-[50%] size-6 md:size-8 xl:size-10" />
                            <div className="text-left">
                                <p className="font-medium text-base md:text-lg xl:text-xl">{toCurrency}</p>
                                <p className="-mt-1 text-neutral-500">{CurrencyNames[toCurrency]}</p>
                            </div>
                        </div>
                        <ArrowUp2 variant="Bold" className={`size-4 md:size-5 xl:size-6 transition-transform duration-300 ${openTab === "to" ? "rotate-180" : ""}`} />
                        {openTab === "to" &&
                            <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-lg mt-2 border border-neutral-200 rounded-lg max-h-80 overflow-hidden">
                                <div className="p-3 border-neutral-200 border-b">
                                    <div className="relative">
                                        <Search size={16} className="top-1/2 left-3 absolute text-neutral-400 -translate-y-1/2 transform" />
                                        <input type="text" placeholder="Search currencies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="py-2 pr-4 pl-10 border border-neutral-200 focus:border-primary rounded-lg focus:outline-none w-full placeholder:text-xs md:placeholder:text-sm xl:placeholder:text-base" />
                                    </div>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {filteredCurrencies.map((currency) => (
                                        <button key={currency.code} onClick={() => handleCurrencySelect("to", currency)} className="flex items-center space-x-3 hover:bg-neutral-50 px-4 py-3 w-full text-left transition-colors">
                                            <img src={`/currencies/${currency.code}.svg`} alt={`${currency.code} flag`} className="rounded-[50%] size-6 md:size-8 xl:size-10" />
                                            <div>
                                                <p className="font-semibold text-lightBlack">{currency.code}</p>
                                                <p className="text-neutral-500 text-sm">{currency.name}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <button onClick={switchCurrency} className="top-1/2 left-1/2 absolute place-content-center grid bg-primary hover:bg-goldenYellow p-2 rounded-[50%] size-10 md:size-12 xl:size-14 text-white hover:text-black -translate-x-1/2 -translate-y-1/2 duration-300 transform">
                        <ArrowSwapVertical className="md:hidden size-6" />
                        <ArrowSwapHorizontal className="hidden md:block size-5 md:size-6 xl:size-7" />
                    </button>
                </div>
            </section>
            <section className="bg-gradient-to-r from-primary/5 to-primary/10 my-6 p-4 md:p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-neutral-600">You get</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-primary text-xl md:text-2xl xl:text-3xl">
                        {currencyData.find(item => item.code === toCurrency)?.symbol}{handleCalculation().toFixed(2)}
                    </span>
                    <span className="text-neutral-600 text-sm md:text-base xl:text-lg">
                        {toCurrency}
                    </span>
                </div>
                <p className="mt-2 text-[11px] text-neutral-500 md:text-xs xl:text-sm">
                    1 USD = {currencies[toCurrency].toFixed(2)} {toCurrency}
                </p>
            </section>
        </main>
    );
}

export default FiatExchange;