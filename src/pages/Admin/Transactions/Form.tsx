import { useState } from "react";
import { toast } from "react-fox-toast";

//Enums and Services
import { SubType, TransactionStatus } from "@/enums";
import { useCreateNewTransaction } from "@/services/mutations.service";

//Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserSelect from "./UserSelect";
import AccountSelect from "./AccountSelect";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Input";

//Icons
import { Loader, Save } from "lucide-react";
import CountrySelector from "./CountrySelector";

//Icons

const Form = ({ onClose }: { onClose: () => void }) => {

    const defaultState = {
        transactionType: "",
        subType: "",
        amount: 0,
        description: "",
        details: {
            accountNumber: "",
            recipient: "",
            fullName: "",
            bankName: "",
        },
        status: "successful",
        beneficiary: false,
        isInternational: false,
        bankAddress: "",
        recipientAddress: "",
        swiftCode: "",
        country: "",
        note: "",
        createdAt: null,
        user: "",
        level: "tax",
        initiatedBy: "user",
        notification: true
    }

    const [formData, setFormData] = useState(defaultState);
    const [linkAccount, setLinkAccount] = useState<boolean>(false);
    const [customiseTime, setCustomiseTime] = useState<boolean>(false);

    //Constants
    const subTypes = Object.values(SubType);
    const status = Object.values(TransactionStatus);
    const types = ["credit", "debit"];
    const actors = ["user", "admin", "system"];
    const levels = ["tax", "tac", "insurance", "done"];

    //Functions
    const handleChange = (key: keyof typeof defaultState | string, value: string | boolean) => {
        setFormData({ ...formData, [key]: value })
    }

    const toggleLinkAccount = () => setLinkAccount((prev) => !prev);

    const handleSelect = (bankDetails: BankAccount) => {
        setFormData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                accountNumber: bankDetails.accountNumber,
                recipient: bankDetails._id,
                fullName: bankDetails.fullName,
                bankName: bankDetails.bankName
            }
        }));
    }

    const createTransaction = useCreateNewTransaction()
    const handleTransaction = () => {

        if (!formData.user.trim()) return toast.error("Kindly select a user to continue.");
        if (formData.isInternational) {
            const requiredFields: (keyof typeof formData)[] = [
                "recipientAddress",
                "bankAddress",
                "country",
                "swiftCode",
            ];

            const isMissingField = requiredFields.some((field) => {
                const value = formData[field];
                return !value || (typeof value === "string" && value.trim().length === 0);
            });

            if (isMissingField) {
                return toast.error(
                    "To proceed, complete all mandatory fields for your international transaction"
                );
            }
        }

        toast.info("Creating Transaction...");

        createTransaction.mutate({
            ...formData,
            createdAt: formData.createdAt ? new Date(formData.createdAt).toISOString() : new Date().toISOString()
        }, {
            onSuccess: () => {
                toast.success("Transaction was added successfully!");
                setFormData(defaultState)
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to add the transaction, kindly try again later.";
                toast.error(message);
            },
        });
    }

    return (
        <main>
            <Badge onClick={onClose} variant="destructive" className="cursor-pointer">Close</Badge>
            <Card className="shadow-sm mx-auto mt-10 border-neutral-200 max-w-4xl">
                <CardHeader className="bg-neutral-100/50 mb-4 border-neutral-200 border-b font-semibold text-base md:text-lg xl:text-xl">
                    Add a New Transaction
                </CardHeader>
                <CardContent className="flex flex-col gap-y-4">

                    {/* Select User */}
                    <UserSelect isUser={!!formData.user.trim()} handleChange={handleChange} />

                    {/* Transaction Type */}
                    <div>
                        <label htmlFor="type">Transaction Type<span className="text-red-600">*</span></label>
                        <Select value={formData.transactionType} onValueChange={(value) => handleChange("transactionType", value)}>
                            <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E]">
                                <SelectValue className="capitalize" placeholder="Transaction Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((type) => (
                                    <SelectItem className="text-xs md:text-sm xl:text-base capitalize" key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sub Transaction Type */}
                    <div>
                        <label htmlFor="subType">Transaction SubType<span className="text-red-600">*</span></label>
                        <Select value={formData.subType} onValueChange={(value) => handleChange("subType", value)}>
                            <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E]">
                                <SelectValue placeholder="Transaction SubType" />
                            </SelectTrigger>
                            <SelectContent>
                                {subTypes.map((subtype) => (
                                    <SelectItem className="text-xs md:text-sm xl:text-base capitalize" key={subtype} value={subtype}>
                                        {subtype}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Transaction Linking */}
                    <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
                        <Checkbox checked={linkAccount} onCheckedChange={() => setLinkAccount((prev) => !prev)}
                            className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
                        <div className="gap-1.5 grid font-normal">
                            <p className="font-medium leading-none">Link Account?</p>
                            <p className="text-neutral-500">
                                Kindly select to show the account dropdown
                            </p>
                        </div>
                    </Label>

                    {/* Account Select */}
                    <AccountSelect linkAccount={linkAccount} setLinkAccount={toggleLinkAccount} recipient={formData.details.recipient} handleSelect={handleSelect} />

                    {/* Account Name */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="fullName">Account Name<span className="text-red-600">*</span></label>
                        <Input type="text" id="fullName" className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary" value={formData.details.fullName} onChange={(e) => handleChange("fullName", e.target.value)} placeholder="Enter Account Name" />
                    </div>

                    {/* Bank Name */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="bankName">Bank Name<span className="text-red-600">*</span></label>
                        <Input type="text" id="bankName" className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary" value={formData.details.bankName} onChange={(e) => handleChange("bankName", e.target.value)} placeholder="Enter Bank Name" />
                    </div>

                    {/* Account Number */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="accountNumber">Account Number<span className="text-red-600">*</span></label>
                        <Input type="text" id="accountNumber" className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary" value={formData.details.accountNumber} onChange={(e) => handleChange("accountNumber", e.target.value)} inputMode="numeric" max={12} placeholder="Enter Account Number" pattern="\d{10,12}$" title="Account number must be 10 to 12 digits long" />
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="amount">Amount<span className="text-red-600">*</span></label>
                        <Input type="number" min={0} pattern="[0-9]*" id="amount" className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary" value={formData.amount} onChange={(e) => handleChange("amount", e.target.value)} placeholder="$0.00" />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea name="description" value={formData.description} id="description" placeholder="Description (Optional)" maxLength={140} title="Description must be 140 characters or fewer" className="bg-inherit px-4 py-3 border focus:border-primary rounded-lg focus:outline-none h-20 duration-300 focus:caret-primary resize-none" onChange={(e) => handleChange("description", e.target.value)}></textarea>
                    </div>

                    {/* International Transaction */}
                    <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 my-2 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
                        <Checkbox checked={formData.isInternational} onCheckedChange={(checked) => handleChange("isInternational", checked === true)}
                            className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
                        <div className="gap-1.5 grid font-normal">
                            <p className="font-medium leading-none">International Transaction?</p>
                            <p className="text-neutral-500">
                                Kindly check the box if it is an international transaction
                            </p>
                        </div>
                    </Label>

                    {formData.isInternational &&
                        <div className="flex flex-col gap-y-3">
                            <CustomInput type="text" placeholder="Bank Address" label="Bank Address" id="bankAddress" value={formData.bankAddress} onChange={(e) => handleChange("bankAddress", e.target.value)} />

                            <CustomInput type="text" placeholder="Recipient Address" label="Recipient Address" id="recipientAddress" value={formData.recipientAddress} onChange={(e) => handleChange("recipientAddress", e.target.value)} />

                            <CustomInput type="text" placeholder="DEUTDEFF500" label="Swift Code/BIC" id="swiftCode" value={formData.swiftCode} onChange={(e) => handleChange("swiftCode", e.target.value)} />

                            <CountrySelector onSelect={handleChange} />
                        </div>
                    }

                    {/* Beneficiary */}
                    <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
                        <Checkbox checked={formData.beneficiary} onCheckedChange={(checked) => handleChange("beneficiary", checked === true)}
                            className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
                        <div className="gap-1.5 grid font-normal">
                            <p className="font-medium leading-none">Make the account a beneficiary?</p>
                            <p className="text-neutral-500">
                                Kindly select to make the account a beneficiary in the user account.
                            </p>
                        </div>
                    </Label>

                    {/* Beneficiary Note */}
                    {formData.beneficiary &&
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="note">Note (Optional)</label>
                            <textarea name="note" value={formData.note} id="description" placeholder="Beneficiary Note (Optional)" maxLength={140} title="Note must be 140 characters or fewer" className="bg-inherit px-4 py-3 border focus:border-primary rounded-lg focus:outline-none h-20 duration-300 focus:caret-primary resize-none" onChange={(e) => handleChange("note", e.target.value)}></textarea>
                        </div>}

                    {/* Customize Date and Time */}
                    <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
                        <Checkbox checked={customiseTime} onCheckedChange={() => setCustomiseTime((prev) => !prev)}
                            className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
                        <div className="gap-1.5 grid font-normal">
                            <p className="font-medium leading-none">Customize Date and Time?</p>
                            <p className="text-neutral-500">
                                Kindly select to choose preferred date and time
                            </p>
                        </div>
                    </Label>

                    {/* Time */}
                    {customiseTime && <div className="flex flex-col gap-y-1 mb-4">
                        <label htmlFor="createdAt" className="block font-medium text-[11px] md:text-xs xl:text-sm">
                            Date and Time
                        </label>
                        <Input id="createdAt" type="datetime-local" value={formData.createdAt || ""} onChange={(e) => handleChange("createdAt", e.target.value)} className="bg-inherit px-4 py-2 border border-neutral-200 rounded-lg focus:outline-1 focus:outline-none focus:outline-primary w-full text-black duration-300 focus:caret-primary" />
                    </div>}

                    {/* Status */}
                    <div>
                        <label htmlFor="subType">Transaction Status<span className="text-red-600">*</span></label>
                        <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                            <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E]">
                                <SelectValue placeholder="Transaction Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {status.map((status) => (
                                    <SelectItem className="text-xs md:text-sm xl:text-base capitalize" key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Initiated By */}
                    <div>
                        <label htmlFor="subType">Initiated By<span className="text-red-600">*</span></label>
                        <Select value={formData.initiatedBy} onValueChange={(value) => handleChange("initiatedBy", value)}>
                            <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E]">
                                <SelectValue placeholder="Transaction Initiation" />
                            </SelectTrigger>
                            <SelectContent>
                                {actors.map((actor) => (
                                    <SelectItem className="text-xs md:text-sm xl:text-base capitalize" key={actor} value={actor}>
                                        {actor}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Level */}
                    <div>
                        <label htmlFor="subType">Transaction Level<span className="text-red-600">*</span></label>
                        <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
                            <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E]">
                                <SelectValue placeholder="Transaction Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {levels.map((level) => (
                                    <SelectItem className="text-xs md:text-sm xl:text-base capitalize" key={level} value={level}>
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Notification */}
                    <Label className="flex items-start gap-3 has-[[aria-checked=true]]:bg-blue-50 hover:bg-accent/50 dark:has-[[aria-checked=true]]:bg-blue-950 p-3 border has-[[aria-checked=true]]:border-blue-600 dark:has-[[aria-checked=true]]:border-blue-900 rounded-lg">
                        <Checkbox checked={formData.notification} onCheckedChange={(checked) => handleChange("notification", checked === true)}
                            className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-700 data-[state=checked]:text-white" />
                        <div className="gap-1.5 grid font-normal">
                            <p className="font-medium leading-none">Notify User?</p>
                            <p className="text-neutral-500">
                                Toggle on if you want the user to be notified
                            </p>
                        </div>
                    </Label>

                    {/* Submit Button */}
                    <Button onClick={handleTransaction} disabled={false} className="bg-primary hover:bg-primary/90 py-3 text-white">
                        {createTransaction.isPending ? <Loader className="mr-1 size-5 animate-spin" /> : <Save className="mr-1 size-5" />}
                        {createTransaction.isPending ? "Creating..." : "Create Transaction"}
                    </Button>
                </CardContent>
            </Card>
        </main >
    );
}

export default Form;