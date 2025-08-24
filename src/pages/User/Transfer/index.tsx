import { useState } from "react";

//Hooks
import { GetBeneficiaries } from "@/services/queries.service";

//Components
import { SkeletonLoader } from "@/components/LoadingScreen";
import { ErrorScreen } from "@/components/ErrorComponents";
import BeneficiaryCard from "./BeneficiaryCard";
import TransferForm from "./TransferForm";
import BeneficiaryForm from "./BeneficiaryForm";

//Icons
import { SquarePlus } from "lucide-react";

const Index = () => {

    const { data, isFetching, isError, isLoading, refetch } = GetBeneficiaries();
    const [newBeneficiary, setNewBeneficiary] = useState<boolean>(false);

    //Functions
    const toggleBeneficiary = () => setNewBeneficiary((prev) => !prev);

    return (
        <>{newBeneficiary && <BeneficiaryForm closeModal={toggleBeneficiary} />}
            <main>
                <div>
                    <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">Transfer & Pay</h1>
                    <p className="text-neutral-400">Send money to friends, family, or pay your bills</p>
                </div>
                <section className="flex md:flex-row flex-col-reverse md:justify-between gap-5 mt-10">
                    <main className="bg-white shadow-sm p-4 border border-neutral-200 rounded-3xl w-full md:w-1/2 xl:w-[60%] h-fit text-neutral-900">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-base md:text-lg xl:text-xl">Your Beneficiaries</h3>
                            <button onClick={toggleBeneficiary} className="flex gap-x-2 bg-primary hover:bg-accent px-6 py-3 rounded-2xl text-neutral-100 duration-300"><SquarePlus className="size-4 md:size-5 xl:size-6" />Add New</button>
                        </div>
                        {(isFetching || isLoading) && <SkeletonLoader lines={4} />}
                        {isError && <ErrorScreen variant="card" type="500" size="sm" onRetry={refetch} />}
                        <div className="max-h-96 overflow-y-auto">
                            {(!isFetching && data && data.data !== undefined) &&
                                <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                    {data.data.map((beneficiary: Beneficiary) => (
                                        <BeneficiaryCard key={beneficiary._id} beneficiary={beneficiary} />
                                    ))}
                                </div>
                            }
                        </div>
                    </main>
                    <main className="bg-white shadow-sm p-4 border border-neutral-200 rounded-3xl w-full md:w-1/2 xl:w-[40%]">
                        <TransferForm />
                    </main>
                </section>
            </main>
        </>
    );
}

export default Index;