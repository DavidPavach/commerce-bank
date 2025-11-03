import { useState } from "react";
import { toast } from "react-fox-toast";

//Utils, Types, Services and Data
import { formatCurrency, formatDate } from "@/utils/format";
import { TransactionWithUser } from "@/types";
import { getIcon, getStatusBadge } from "@/components/Utils";
import { useUpdateTransaction } from "@/services/mutations.service";
import countriesJson from "../../../../data/countries.json";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserInfo from "@/components/UserInfo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/Input";
import CountrySelector from "./CountrySelector";

//Icons
import { Building2, Loader, Save } from "lucide-react";
import { Global } from "iconsax-react";


const getFlag = (countryName: string): string | null => {
    const entry = Object.entries(countriesJson).find(
        ([, data]) => data.name.toLowerCase() === countryName.toLowerCase()
    );
    return entry ? `/flags/${entry[0]}.png` : null;
};

export default function TransactionDetails({ transaction, onClose }: { transaction: TransactionWithUser, onClose: () => void; }) {

    const defaultState = {
        createdAt: "",
        isInternational: false,
        bankAddress: "",
        routingNumber: "",
        recipientAddress: "",
        swiftCode: "",
        country: ""
    }
    const [formData, setFormData] = useState(defaultState);

    //Functions
    const handleChange = (key: keyof typeof defaultState | string, value: string | boolean) => {
        setFormData({ ...formData, [key]: value })
    }

    const updateTransaction = useUpdateTransaction()
    const handleUpdate = () => {

        const finalData = { transactionId: transaction._id, ...formData }
        if (formData.createdAt.trim()) {
            finalData.createdAt = new Date(formData.createdAt).toISOString()
        }

        if (formData.isInternational) {
            const requiredFields: (keyof typeof formData)[] = [
                "recipientAddress",
                "routingNumber",
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

        updateTransaction.mutate(finalData, {
            onSuccess: (response) => {
                toast.success(response.message || "The transaction was updated successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Transaction update failed, kindly try again.";
                toast.error(message);
            },
        })
    }

    return (
        <div className="space-y-4 mx-auto pb-20 rounded-lg w-full max-w-4xl">
            <Card className="shadow-sm border-neutral-200">
                <CardHeader className="bg-neutral-100/50 border-neutral-200 border-b">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                        <CardTitle className="text-lightBlack text-xl capitalize">{transaction.transactionType} Transaction</CardTitle>
                        <div className="flex gap-x-5">
                            {getStatusBadge(transaction.status)}
                            <Badge variant="destructive" className="cursor-pointer" onClick={onClose}>Close</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="gap-x-8 gap-y-4 grid grid-cols-1 sm:grid-cols-2">
                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Transaction Mode</p>
                            <div className="font-medium text-lightBlack">{getIcon(transaction.subType, true)}</div>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Transaction Description</p>
                            <p className="font-medium text-lightBlack">{transaction?.description?.trim() ? transaction.description : "No Description"}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Date & Time</p>
                            <p className="font-medium text-lightBlack">{formatDate(new Date(transaction.createdAt))}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Amount</p>
                            <p className="flex items-center font-bold text-lightBlack text-base md:text-base xl:text-xl">
                                {formatCurrency(transaction.amount)}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium text-neutral-500">Level</p>
                            <p className="font-medium text-lightBlack uppercase">{transaction.level}</p>
                        </div>

                        <div className="space-y-1 col-span-1 md:col-span-2">
                            <p className="font-medium text-neutral-500">Transaction ID</p>
                            <p className="font-medium text-lightBlack break-all">{transaction.transactionId}</p>
                        </div>
                        {transaction.details && transaction.details !== null &&
                            <div>
                                <h3 className="flex items-center space-x-2 mb-4 font-semibold text-slate-900 text-base md:text-lg xl:text-xl">
                                    <Building2 className="size-5 text-primary" />
                                    <span>Account Information</span>
                                </h3>
                                {transaction.details?.accountNumber && typeof transaction.details.accountNumber === 'string' && (
                                    <div className="gap-x-8 grid grid-cols-1 md:grid-cols-2 mb-4">
                                        <p className="text-slate-600">
                                            {transaction.subType === 'cryptocurrency' ? 'Wallet Address' : 'Account Number'}
                                        </p>
                                        <p className="font-semibold text-slate-900 text-sm">
                                            {transaction.details.accountNumber}
                                        </p>
                                    </div>
                                )}
                                {transaction.details && transaction.details.fullName && (
                                    <div className="gap-x-8 grid grid-cols-1 md:grid-cols-2">
                                        <span className="text-slate-600">Account Holder</span>
                                        <span className="font-medium text-slate-900">{transaction.details.fullName}</span>
                                    </div>
                                )}
                                {transaction.details && transaction.details.balanceAfterTransaction && (
                                    <div className="gap-x-8 grid grid-cols-1 md:grid-cols-2">
                                        <span className="text-slate-600">Balance After</span>
                                        <span className="font-medium text-slate-900">
                                            $
                                            {transaction.details.balanceAfterTransaction.toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        }
                        {transaction.isInternational &&
                            <div className="space-y-6">
                                <h3 className="flex items-center space-x-2 mb-4 font-semibold text-slate-900 text-base md:text-lg xl:text-xl">
                                    <Global className="size-5 text-primary" />
                                    <span>International Details</span>
                                </h3>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Bank Address</span>
                                    <span className="font-medium text-slate-900">{transaction.bankAddress}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Routing Number</span>
                                    <span className="font-medium text-slate-900">{transaction.routingNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Recipient Address</span>
                                    <span className="font-medium text-slate-900">{transaction.recipientAddress}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Swift Code/BIC</span>
                                    <span className="font-medium text-slate-900">{transaction.swiftCode}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Country</span>
                                    <div className="flex items-center gap-x-1 font-medium text-slate-900">{transaction.country && <img src={getFlag(transaction.country) || ""} className="rounded-sm h-4 md:h-5 xl:h-6" alt={transaction.country + " flag"} />}<span className="capitalize">{transaction.country}</span></div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="mt-4 py-4 border-neutral-200 border-t">
                        <p className="my-4">Update Transaction</p>
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
                                <Input type="text" placeholder="Bank Address" label="Bank Address" id="bankAddress" value={formData.bankAddress} onChange={(e) => handleChange("bankAddress", e.target.value)} />

                                <Input type="text" placeholder="Recipient Address" label="Recipient Address" id="recipientAddress" value={formData.recipientAddress} onChange={(e) => handleChange("recipientAddress", e.target.value)} />

                                <Input type="text" placeholder="DEUTDEFF500" label="Swift Code/BIC" id="swiftCode" value={formData.swiftCode} onChange={(e) => handleChange("swiftCode", e.target.value)} />

                                <Input type="text" placeholder="123456789" label="Routing Number" id="routingNumber" value={formData.routingNumber} onChange={(e) => handleChange("routingNumber", e.target.value)} />
                                
                                <CountrySelector onSelect={handleChange} />
                            </div>
                        }
                        <div className="flex flex-col gap-y-1 my-4">
                            <label className="block font-medium text-[11px] md:text-xs xl:text-sm">
                                Date and Time
                            </label>
                            <input type="datetime-local" value={formData.createdAt} onChange={(e) => handleChange("createdAt", e.target.value)} className="p-2 border rounded w-full" />
                        </div>
                        <Button onClick={handleUpdate} disabled={updateTransaction.isPending} className="bg-primary hover:bg-primary/90 py-3 text-white">
                            {updateTransaction.isPending ? <Loader className="mr-2 size-5 animate-spin" /> : <Save className="mr-2 size-5" />}
                            {updateTransaction.isPending ? "Updating..." : "Update Transaction"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {typeof transaction.user !== "string" && <UserInfo user={transaction.user} />}
        </div>
    )
}
