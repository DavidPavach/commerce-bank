import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Hooks
import { useCardRequest } from "@/services/mutations.service";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

//Icons
import { CreditCard, Plus } from "lucide-react";
import { Buildings2, Shield, Star, Truck } from "iconsax-react";


const Form = () => {

    const [requestReason, setRequestReason] = useState<string>("")

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    //Functions
    const createCardRequest = useCardRequest();
    const handleCardRequest = () => {

        createCardRequest.mutate(undefined, {
            onSuccess: (response) => {
                toast.success(response.message || "You card request was recorded successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Card Request failed, kindly try again later.";
                toast.error(message);
            },
        })
    }


    return (
        <motion.div variants={itemVariants}>
            <motion.div variants={itemVariants} className="mb-12">
                <Card className="bg-white shadow-xl backdrop-blur-sm border-0">
                    <CardHeader className="text-center">
                        <div className="flex justify-center items-center bg-[#1D9B5E] mx-auto mb-4 rounded-full size-14 md:size-16 xl:size-20">
                            <CreditCard className="size-7 md:size-8 xl:size-10 text-white" />
                        </div>
                        <CardTitle className="mb-2 font-bold text-slate-900 text-lg md:text-xl xl:text-2xl">Get Your Commerce Bank Card</CardTitle>
                        <p className="text-slate-600">
                            Apply for your first Commerce Bank USA card and enjoy secure, convenient banking.
                        </p>
                    </CardHeader>
                </Card>
            </motion.div>

            <Card className="bg-white shadow-xl backdrop-blur-sm border-0">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Plus className="size-4 md:size-5 xl:size-6 text-[#1D9B5E]" />
                        <span>Request New Card</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="gap-5 grid lg:grid-cols-2">
                        {/* Card Types */}
                        <div className={`p-2 h-fit sm:p-4 border-2 rounded-lg cursor-pointer transition-all border-[#1D9B5E] bg-[#1D9B5E]/5 }`}>
                            <div className="flex items-start gap-1">
                                <div className="flex justify-center items-center bg-purple-100 rounded-full size-10">
                                    <Star className="size-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900">Credit Card</h3>
                                    <p className="mt-1 text-[11px] text-slate-600 md:text-xs xl:text-sm">
                                        Build credit and earn rewards. Flexible payment options with competitive rates.
                                    </p>
                                    <div className="flex items-center space-x-4 mt-2 text-slate-500 text-xs">
                                        <span className="flex items-center space-x-1">
                                            <Star className="size-3" />
                                            <span>Rewards</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Shield className="size-3" />
                                            <span>Protected</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Buildings2 className="size-3" />
                                            <span>Credit Building</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Request Form */}
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="request-reason">Reason for Request (Optional)</Label>
                                <Textarea id="request-reason" placeholder="Why do you need this card? (e.g., first card, replacement, additional card)" value={requestReason} onChange={(e) => setRequestReason(e.target.value)} className="mt-1 resize-none" rows={3} />
                            </div>

                            <Separator />

                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="flex items-center space-x-2 mb-2 font-semibold text-slate-900">
                                    <Truck className="size-4 text-[#1D9B5E]" />
                                    <span>Delivery Information</span>
                                </h4>
                                <ul className="space-y-1 text-[11px] text-slate-600 md:text-xs xl:text-sm">
                                    <li>• Standard delivery: 7-10 business days (Free)</li>
                                    <li>• Express delivery: 2-3 business days ($15)</li>
                                    <li>• Cards are sent via secure, trackable mail</li>
                                    <li>• You'll receive activation instructions with your card</li>
                                </ul>
                            </div>

                            <Button onClick={handleCardRequest} disabled={createCardRequest.isPending} className="w-full font-medium text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                {createCardRequest.isPending ? (
                                    <>
                                        <div className="mr-2 border-2 border-white border-t-transparent rounded-full size-4 animate-spin" />
                                        Processing Request...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 size-4" />
                                        Request Credit Card
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default Form;