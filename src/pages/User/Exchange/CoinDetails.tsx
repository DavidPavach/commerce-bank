//Enums
import { coinMeta } from "@/enums";
import { formatCurrency } from "@/utils/format";

//Icons
import { Clock, TrendUp } from "iconsax-react";

const CoinDetails = ({ prices }: { prices: Prices }) => {
    return (
        <main>
            <section className="bg-white shadow-sm p-4 md:p-6 border border-neutral-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                    <TrendUp className="size-6 md:size-7 xl:size-8 text-primary" variant="Bulk" />
                    <h3 className="font-semibold text-lightBlack">Top Cryptocurrencies</h3>
                </div>
                {Object.keys(prices).map((coin) => {
                    const data = prices[coin];
                    const meta = coinMeta[coin];

                    if (!data || !meta) return null;

                    return (
                        <div key={meta.name} className="flex justify-between items-center space-x-3 hover:bg-neutral-50 py-3 w-full text-left transition-colors">
                            <div className="flex items-center gap-x-1">
                                <img src={meta.logo} alt={`${coin} logo`} className="size-8 md:size-12 xl:size-14" />
                                <div>
                                    <h3 className="font-semibold text-black text-sm sm:text-base md:text-lg xl:text-xl">{meta.symbol}</h3>
                                    <p className="-mt-1 text-[11px] text-neutral-500 md:text-xs xl:text-sm capitalize">{coin}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="font-semibold text-lightBlack">{formatCurrency(data.usd)}</p>
                                <p className={`text-[11px] md:text-xs xl:text-sm px-2 py-1 rounded-full w-fit font-semibold ${data.usd_24h_change >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {data.usd_24h_change >= 0 ? "+" : ""}
                                    {data.usd_24h_change.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    );
                })}
            </section>
            <section className="bg-white shadow-sm mt-5 p-4 md:p-6 border border-neutral-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                    <Clock className="text-primary" />
                    <h3 className="font-semibold text-lightBlack">Market Info</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-neutral-600">Last Updated</span>
                        <span className="font-medium text-lightBlack">Just now</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-600">Market Status</span>
                        <span className="font-medium text-primary">Open</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-600">Next Update</span>
                        <span className="font-medium text-lightBlack">1 min</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CoinDetails;