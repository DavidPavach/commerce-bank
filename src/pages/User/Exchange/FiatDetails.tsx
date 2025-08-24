//Icon
import { Clock, TrendUp } from "iconsax-react";


const FiatDetails = ({ currencies }: { currencies: Currencies }) => {

    const popularPairs = [
        { from: 'USD', to: 'EUR', rate: currencies.EUR.toFixed(2), img1: "/currencies/USD.svg", img2: "/currencies/EUR.svg" },
        { from: 'GBP', to: 'USD', rate: (currencies.USD / currencies.GBP).toFixed(2), img1: "/currencies/GBP.svg", img2: "/currencies/USD.svg" },
        { from: 'EUR', to: 'GBP', rate: (currencies.GBP / currencies.EUR).toFixed(2), img1: "/currencies/EUR.svg", img2: "/currencies/GBP.svg" },
        { from: 'USD', to: 'JPY', rate: currencies.JPY.toFixed(2), img1: "/currencies/USD.svg", img2: "/currencies/JPY.svg" },
    ];

    return (
        <main>
            <section className="bg-white shadow-sm p-4 md:p-6 border border-neutral-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                    <TrendUp className="size-6 md:size-7 xl:size-8 text-primary" variant="Bulk" />
                    <h3 className="font-semibold text-lightBlack">Popular Pairs</h3>
                </div>
                {popularPairs.map((pair, index) => (
                    <div key={index} className="flex justify-between items-center hover:bg-neutral-50 p-3 rounded-lg transition-colors">
                        <div className="flex items-center space-x-2">
                            <div className="flex">
                                <img src={pair.img1} alt="flags" className="relative rounded-[50%] size-5" />
                                <img src={pair.img2} alt="flags" className="relative -ml-1 rounded-[50%] size-6" />
                            </div>
                            <span className="font-medium text-lightBlack">{pair.from}/{pair.to}</span>
                        </div>
                        <span className="font-semibold text-primary">{pair.rate} {pair.to}</span>
                    </div>
                ))
                }
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

export default FiatDetails;