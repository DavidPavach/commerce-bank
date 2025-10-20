import { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

//Stores and Hooks
import { useTransactionStore } from "@/stores/transactionStore";
import { useUserStore } from "@/stores/userStore";
import { GetAccountDetails } from "@/services/queries.service";

//Components
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Pin from "./Pin";

//Icons
import { Bank, Send2 } from "iconsax-react";
import { Loader } from "lucide-react";

const TransferForm = () => {

    const { user, refetchUserData, balance } = useUserStore();
    const [manualEntry, setManualEntry] = useState<boolean>(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<boolean>(false);
    const [transferPinPage, setTransferPinPage] = useState<boolean>(false);
    const { transaction, updateTransaction, updateDetails, isTransactionValid } = useTransactionStore();
    const { data, isFetching, isError, isLoading } = GetAccountDetails(manualEntry, transaction.details.accountNumber);


    //Functions
    useEffect(() => {
        if (!user) {
            refetchUserData();
        }
    }, [refetchUserData, user])


    const handleClick = (beneficiary: Beneficiary) => {
        updateDetails(beneficiary);
        setSelectedSuggestion(true);
    }

    const handleTransfer = () => {
        if (!isTransactionValid()) return toast.error("Kindly fill all the required fields")
        setTransferPinPage((prev) => !prev)
    }

    return (
        <>
            {transferPinPage && <Pin onClose={() => setTransferPinPage((prev) => !prev)} />}
            <main className="text-neutral-900">
                <h1 className="font-semibold text-base md:text-lg xl:text-xl">Transfer Details</h1>
                <div className="flex flex-col gap-y-3 mt-4">
                    <Input type="text" placeholder="0000 0000 00" label="Account Number" id="accountNumber" pattern="\d{10,12}$" title="Account number must be 10 to 12 digits long" value={transaction.details.accountNumber} inputMode="numeric" max={12} required={true} onChange={(e) => {
                        updateDetails({ accountNumber: e.target.value });
                        setManualEntry(true);
                    }} />

                    {(isFetching || isLoading) && <Loader className="mx-auto my-4 text-blue-600 animate-spin" />}

                    {((isError && transaction.details.accountNumber.length === 10) || (transaction.details.fullName.length > 0)) &&
                        <div className="flex flex-col gap-y-3">
                            <Input type="text" placeholder="John Doe" label="Full Name" id="fullName" value={transaction.details.fullName} required={true} onChange={(e) => updateDetails({ fullName: e.target.value })} />

                            <Input type="text" placeholder="JPMorgan Chase" label="Bank Name" id="bankName" value={transaction.details.bankName} required={true} onChange={(e) => updateDetails({ bankName: e.target.value })} />
                        </div>
                    }
                    {(data && data.data !== undefined && !selectedSuggestion) && (
                        <div className="flex items-center gap-x-2 bg-neutral-100 hover:bg-primary/10 p-4 border border-neutral-200 hover:border-primary rounded-xl duration-300 cursor-pointer" onClick={() => { handleClick(data.data); updateDetails({ recipient: data.data._id }); }}>
                            <div className="bg-neutral-300 p-2 rounded-[50%]">
                                <Bank className="size-5" />
                            </div>
                            <div>
                                <p className="font-medium text-sm md:text-base xl:text-lg">{data.data.fullName}</p>
                                <p>{data.data.bankName}</p>
                            </div>
                        </div>
                    )}

                    <Input type="number" placeholder="$0.00" label="Amount" id="amount" value={transaction.amount.toString()} min={0} pattern="[0-9]*" title="Please enter a positive number" required={true} onChange={(e) => updateTransaction({ amount: Number(e.target.value) })} />

                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea name="description" value={transaction.description} id="description" placeholder="Description (Optional)" maxLength={140} title="Description must be 140 characters or fewer" className="bg-inherit px-4 py-3 border focus:border-primary rounded-2xl focus:outline-none h-20 text-sm md:text-base xl:text-lg duration-300 focus:caret-primary resize-none" onChange={(e) => updateTransaction({ description: e.target.value })}></textarea>
                    </div>

                    <div className="flex items-center gap-x-3 my-1">
                        <Checkbox onCheckedChange={(checked) => updateTransaction({ beneficiary: checked ? true : false })} id="toggle" className="data-[state=checked]:bg-primary data-[state=checked]:border-primary size-4 md:size-5 data-[state=checked]:text-white" />
                        <Label htmlFor="toggle" className="font-medium">Make Beneficiary</Label>
                    </div>

                    {transaction.beneficiary === true &&
                        <Textarea placeholder="Enter Beneficiary Note Here (Optional)." id="message" onChange={(e) => updateTransaction({ note: e.target.value })} />
                    }

                    <Button onClick={handleTransfer} text="Transfer" disabled={balance !== null && (transaction.amount > balance)} loading={false} icon={<Send2 />} />
                </div>
            </main>
        </>
    );
}

export default TransferForm;