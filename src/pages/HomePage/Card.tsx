import { Link } from "react-router-dom";

//Images
import cardImg from "/cards.png";

//Icons
import { ArrowRight, CardPos, MoneyForbidden, MoneyRecive, SecuritySafe } from "iconsax-react";

const Card = () => {
    return (
        <main className="flex md:flex-row flex-col-reverse md:justify-between md:items-center gap-y-5 md:gap-y-0 py-7 md:py-10 xl:py-14">
            <section className="w-full md:w-[45%] xl:w-[48%]">
                <img src={cardImg} alt="Card Images" className="rounded-3xl" />
            </section>
            <section className="flex flex-col gap-y-5 w-full md:w-[45%] xl:w-[48%] text-sm md:text-base xl:text-lg">
                <main className="flex items-center gap-x-2 px-3 py-1 border border-primary rounded-3xl w-fit font-medium text-primary tracking-wide">
                    <div className="bg-primary rounded-[50%] size-1 md:size-1.5 xl:size-2" />
                    <p className="text-xs md:text-sm xl:text-base">Smart Cards</p>
                </main>
                <h1 className="max-w-[18ch] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">Globally Accepted Credit or Debit Card.</h1>
                <p className="max-w-[50ch] text-neutral-600">Pick an eye-catching debit or credit card in your choice of color to use with your bank account. Enable mobile payments, and start spending before your physical card arrives.</p>
                <div className="space-y-5 mt-10">
                    <section className="gap-5 grid grid-cols-1 sm:grid-cols-2">
                        <div className="flex items-center gap-x-2 p-4 border border-[#0A1519]/10 rounded-2xl">
                            <CardPos className="bg-primary p-2 rounded-lg size-9 md:size-10 text-white shrink-0" />
                            <p className="xl:text-[13px] text-xs md:text-sm">Enjoy free three (3) ATM Withdrawals every month forever.</p>
                        </div>
                        <div className="flex items-center gap-x-2 p-4 border border-[#0A1519]/10 rounded-2xl">
                            <MoneyForbidden className="bg-primary p-2 rounded-lg size-9 md:size-10 text-white shrink-0" />
                            <p className="xl:text-[13px] text-xs md:text-sm">Zero Foreign Transaction Fees when spending abroad.</p>
                        </div>
                    </section>
                    <section className="gap-5 grid grid-cols-1 sm:grid-cols-2">
                        <div className="flex items-center gap-x-2 p-4 border border-[#0A1519]/10 rounded-2xl">
                            <MoneyRecive className="bg-primary p-2 rounded-lg size-9 md:size-10 text-white shrink-0" />
                            <p className="xl:text-[13px] text-xs md:text-sm">Earn Cashback Rewards on every purchase, giving you money back on your spending.</p>
                        </div>
                        <div className="flex items-center gap-x-2 p-4 border border-[#0A1519]/10 rounded-2xl">
                            <SecuritySafe className="bg-primary p-2 rounded-lg size-9 md:size-10 text-white shrink-0" />
                            <p className="xl:text-[13px] text-xs md:text-sm">Benefit from Enhanced Security Features to safeguard your transactions against fraud.</p>
                        </div>
                    </section>
                </div>
                <Link to="/auth" className="group flex items-center gap-x-2 bg-primary hover:bg-[#D2F801] mt-4 px-6 py-4 rounded-[3rem] w-fit font-medium hover:font-semibold text-neutral-100 hover:text-neutral-800 text-xs md:text-sm xl:text-base duration-300">GET STARTED NOW <ArrowRight className="size-5 md:size-6 group-hover:translate-x-3 duration-300" /></Link>
            </section>
        </main>
    );
}

export default Card;