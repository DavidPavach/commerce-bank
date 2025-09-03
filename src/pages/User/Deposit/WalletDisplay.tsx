import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

//Components
import { Separator } from "@radix-ui/react-select";

//Icons
import { Copy, CheckCircle, Info, AlertTriangle, Shield } from "lucide-react";
import { CloseCircle } from "iconsax-react";


const WalletDisplay = ({ onClose }: { onClose: () => void; }) => {
    const [copied, setCopied] = useState<boolean>(false)
    const wallet: string = "TRjrhu1ALSvVNUbY7jLGE8cW1yxkwLsM7k"

    //Functions
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(wallet)
        setCopied(true)
        toast.info("Wallet address was copied to clipboard")
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <AnimatePresence>
            <motion.div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 text-lightBlack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                <motion.div className="bg-white shadow-xl p-4 md:p-6 rounded-2xl w-full max-w-xl"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-sm md:text-base xl:text-lg">Wallet Address</h2>
                        <CloseCircle variant="Bold" onClick={onClose} className="bg-red-100 size-5 md:size-6 xl:size-7 text-red-600 cursor-pointer" />
                    </div>

                    <div className="flex justify-between items-center bg-accent/20 mt-4 p-3 border border-neutral-300 border-dashed rounded-xl">
                        <p className="font-semibold break-all">
                            {wallet}
                        </p>
                        {copied ? (
                            <CheckCircle className="size-5 md:size-6 xl:size-7 text-primary cursor-pointer shrink-0" />
                        ) : (
                            <Copy onClick={copyToClipboard} className="size-5 md:size-6 xl:size-7 cursor-pointer shrink-0" />
                        )}
                    </div>

                    <div className="flex justify-center my-4">
                        <img src="/wallet.jpg" alt="Deposit Wallet Address" className="border border-neutral-300 rounded-2xl size-40 md:size-52 xl:size-64" />
                    </div>

                    <Separator />

                    <div className="space-y-4 text-[11px] md:text-xs xl:text-sm">
                        <div className="flex items-center space-x-2">
                            <Info className="size-4 text-primary" />
                            <h3 className="font-semibold text-slate-900">Important Information</h3>
                        </div>

                        <div className="gap-4 grid grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-slate-600">Network</p>
                                <p className="font-semibold text-slate-900">TRC20</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-600">Processing Time</p>
                                <p className="font-semibold text-slate-900">5-30 minutes</p>
                            </div>
                        </div>
                    </div>
                    {/* Warning Section */}
                    <div className="bg-yellow-50 my-4 p-4 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="flex-shrink-0 mt-0.5 size-5 text-yellow-600" />
                            <div className="space-y-2">
                                <h4 className="font-semibold text-[11px] text-yellow-800 md:text-xs xl:text-sm">Important Warnings</h4>
                                <ul className="space-y-1 text-yellow-700 text-xs">
                                    <li>
                                        • Only send USDT to this address on the TRC20 network
                                    </li>
                                    <li>• Sending other cryptocurrencies will result in permanent loss</li>
                                    <li>
                                        • Minimum deposit amount is $100.00 USDT
                                    </li>
                                    <li>• Deposits require 8 network confirmations</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-primary/5 p-4 border border-primary/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <Shield className="flex-shrink-0 mt-0.5 size-5 text-primary" />
                            <div>
                                <h4 className="mb-1 font-semibold text-[11px] text-primary md:text-xs xl:text-sm">Secure Deposit</h4>
                                <p className="text-slate-600 text-xs">
                                    This address is generated specifically for your account and is monitored 24/7 by our security
                                    systems. All deposits are automatically credited after network confirmation.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default WalletDisplay;
