import { useState } from "react";
import { toast } from "react-fox-toast";

//Hooks
import { useDepositRequest } from "@/services/mutations.service";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

//Icon
import { AlertTriangle, Calendar, DollarSign, Plus, Shield, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Form = () => {

    const [newAmount, setNewAmount] = useState<string>("");

    //Functions

    const newDeposit = useDepositRequest()
    const handleCreateDeposit = () => {

        if (parseFloat(newAmount) < 100) return toast.error(`The minimum amount is $100.00 kindly add ${100 - parseFloat(newAmount)} to the entered amount`);
        toast("Initiating Deposit Request...", { isCloseBtn: true });

        newDeposit.mutate({ amount: parseFloat(newAmount) }, {
            onSuccess: (response) => {
                toast.success(response.message || "Your Deposit Request was Made Successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Deposit Request failed, kindly try again later.";
                toast.error(message);
            },
        })
    }

    return (
        <Card className="bg-white shadow-xl backdrop-blur-sm border-0">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Plus className="size-6 text-primary" />
                    <span>New Deposit Request</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="gap-8 grid lg:grid-cols-2">
                    {/* Form Section */}
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="amount">Deposit Amount</Label>
                            <div className="relative mt-1">
                                <DollarSign className="top-1/2 left-3 absolute size-4 text-slate-400 -translate-y-1/2 transform" />
                                <Input id="amount" type="number" placeholder="0.00" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="pl-10" min="0" step="0.01" />
                            </div>
                            <p className="mt-1 text-slate-500 text-xs">
                                Minimum deposit: $100.00
                            </p>
                        </div>
                        <Button onClick={handleCreateDeposit} disabled={!newAmount || newAmount.length === 0 || newDeposit.isPending} className="bg-primary w-full md:h-11 font-medium text-white">
                            {newDeposit.isPending ? (
                                <>
                                    <div className="mr-2 border-2 border-white border-t-transparent rounded-full size-4 animate-spin" />
                                    Submitting Request...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 size-4" />
                                    Submit Deposit Request
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Information Section */}
                    <div className="space-y-6">
                        <div className="bg-[#1D9B5E]/5 p-4 md:p-6 border border-[#1D9B5E]/20 rounded-lg">
                            <h3 className="flex items-center space-x-2 mb-4 font-semibold text-slate-900">
                                <Shield className="size-5 text-[#1D9B5E]" />
                                <span>Deposit Process</span>
                            </h3>
                            <div className="space-y-3 text-[11px] text-slate-600 md:text-xs xl:text-sm">
                                <div className="flex items-start space-x-3">
                                    <div className="flex justify-center items-center bg-[#1D9B5E] mt-0.5 rounded-full size-6 font-semibold text-white text-xs">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Submit Request</p>
                                        <p>Enter the deposit amount and transaction hash after approval</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex justify-center items-center bg-[#1D9B5E] mt-0.5 rounded-full size-6 font-semibold text-white text-xs">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Verification</p>
                                        <p>Our team verifies the transaction on the blockchain</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="flex justify-center items-center bg-[#1D9B5E] mt-0.5 rounded-full size-6 font-semibold text-white text-xs">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Credit Account</p>
                                        <p>Funds are credited to your account within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-x-2">
                                <AlertTriangle className="size-5 text-yellow-600" />
                                <h4 className="font-semibold text-yellow-800">Important Notes</h4>
                            </div>
                            <div className="mt-4">
                                <ul className="space-y-1 text-[11px] text-yellow-700 md:text-xs xl:text-sm">
                                    <li>• Deposits are processed during business hours (9 AM - 5 PM EST)</li>
                                    <li>• You can edit the hash once after your request is accepted</li>
                                    <li>• Ensure the transaction hash is correct and complete</li>
                                    <li>• Contact support if you need to cancel a pending request</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                            <h4 className="flex items-center space-x-2 mb-2 font-semibold text-slate-900">
                                <Calendar className="size-4 text-[#1D9B5E]" />
                                <span>Processing Times</span>
                            </h4>
                            <div className="space-y-1 text-[11px] text-slate-600 md:text-xs xl:text-sm">
                                <p>• Standard deposits: 1-3 business days</p>
                                <p>• Large deposits ($10,000+): 3-5 business days</p>
                                <p>• Weekend submissions: Processed on next business day</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}

export default Form;