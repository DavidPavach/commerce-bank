//Components
import Balance from "./Balance";
import Savings from "./Savings";
import Card from "./Card";
import QuickActions from "./QuickActions";
import Transactions from "./Transactions";
import Exchange from "./Exchange";

const index = () => {
    return (
        <main>
            <section className="flex lg:flex-row flex-col gap-x-5 gap-y-5">
                <main className="w-full lg:w-[65%]">
                    <section className="flex md:flex-row flex-col gap-5">
                        <div className="w-full md:w-1/2">
                            <Balance />
                        </div>
                        <div className="md:w-1/2">
                            <Savings />
                        </div>
                    </section>
                    <QuickActions />
                    <Transactions />
                </main>
                <div className="lg:w-[35%]">
                    <Card />
                    <Exchange />
                </div>
            </section>
        </main>
    );
}

export default index;