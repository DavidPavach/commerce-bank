import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Utils and Hooks
import { maskNumber } from "@/utils/format";
import { useUpdateUserProfile } from "@/services/mutations.service";

//Components
import { Button } from "@/components/ui/button";

//Icons
import { Eye, EyeOff, Loader } from "lucide-react";
import { CopySuccess, Lock, Unlock, Copy, Setting2 } from "iconsax-react";

type BankCardProps = {
    cardType?: "debit" | "credit";
    cardNumber: string;
    holderName: string;
    expiryDate: string;
    cvv: string;
    variant: "primary" | "dark" | "gradient";
    showActions?: boolean;
    freezeCard: boolean;
    email: string;
}

export function BankCard({ cardType = "credit", cardNumber, holderName, expiryDate, cvv, variant, showActions = true, freezeCard, email }: BankCardProps) {

    const [showCVV, setShowCVV] = useState<boolean>(false);
    const [showCardNumber, setShowCardNumber] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const copyCardNumber = async () => {
        await navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const formatCardNumber = (number: string) => {
        return number.replace(/(.{4})/g, "$1 ").trim()
    }

    const getCardStyle = () => {
        switch (variant) {
            case "primary":
                return {
                    background: "linear-gradient(135deg, #1D9B5E 0%, #16a085 50%, #0d7377 100%)",
                    shadow: "0 20px 40px rgba(29, 155, 94, 0.3)",
                }
            case "dark":
                return {
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #000000 100%)",
                    shadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                }
            case "gradient":
                return {
                    background: "linear-gradient(135deg, #1D9B5E 0%, #3b82f6 50%, #8b5cf6 100%)",
                    shadow: "0 20px 40px rgba(29, 155, 94, 0.3)",
                }
            default:
                return {
                    background: "linear-gradient(135deg, #1D9B5E 0%, #16a085 100%)",
                    shadow: "0 20px 40px rgba(29, 155, 94, 0.3)",
                }
        }
    }

    const cardStyle = getCardStyle();

    const updateProfile = useUpdateUserProfile();
    const handleCardFreeze = () => {

        const payload: { email: string, freezeCard: boolean } = { email, freezeCard: freezeCard ? false : true };

        updateProfile.mutate(payload, {
            onSuccess: () => {
                toast.success(`Successful 🎉, Your card was ${freezeCard ? "reinstated" : "frozen"} successfully.`);
                window.location.reload()
            },
            onError: () => {
                toast.error(`Failed to update profile details, please try again later.`);
            },
        })
    }

    return (
        <div className="mt-20">
            <motion.div className="relative flex flex-col justify-between m-auto p-4 md:p-6 rounded-2xl max-w-96 h-60 overflow-hidden text-white cursor-pointer"
                style={{ background: cardStyle.background, boxShadow: cardStyle.shadow }}
                whileHover={{ scale: 1.02, rotateY: 5 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>

                <div className="absolute inset-0 opacity-10">
                    <div className="top-4 right-4 absolute border-2 border-white/20 rounded-full w-32 h-32" />
                    <div className="bottom-4 left-4 absolute border-2 border-white/20 rounded-full w-24 h-24" />
                    <div className="top-1/2 left-1/2 absolute border border-white/10 rounded-full w-40 h-40 -translate-x-1/2 -translate-y-1/2 transform" />
                </div>

                {/* Card Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <motion.h3 className="font-bold text-base md:text-lg xl:text-xl tracking-wider" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            Commerce Bank
                        </motion.h3>
                        <motion.p className="opacity-90 font-medium text-[11px] md:text-xs xl:text-sm" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            {cardType.toUpperCase()} CARD
                        </motion.p>
                    </div>
                    <motion.div className="flex items-center space-x-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <div className="flex justify-center items-center bg-white/20 rounded-full size-8">
                            <div className="bg-white rounded-full size-4" />
                        </div>
                        <div className="font-bold text-lg md:text-xl xl:text-2xl tracking-wider">VISA</div>
                    </motion.div>
                </div>

                {/* Card Number */}
                <motion.div className="mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <p className="font-mono font-bold text-lg md:text-xl xl:text-2xl tracking-widest">{showCardNumber ? formatCardNumber(cardNumber) : maskNumber(cardNumber)}</p>
                </motion.div>

                {/* Card Details */}
                <div className="flex justify-between">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <p className="opacity-75 mb-1 text-xs">CARDHOLDER NAME</p>
                        <p className="font-semibold text-base md:text-lg capitalize">{holderName}</p>
                    </motion.div>

                    <div className="flex space-x-6">
                        <motion.div className="text-right" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                            <p className="opacity-75 mb-1 text-xs">EXPIRES</p>
                            <p className="font-mono font-semibold">{expiryDate}</p>
                        </motion.div>

                        <motion.div className="text-right" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                            <p className="opacity-75 mb-1 text-xs">CVV</p>
                            <p className="font-mono font-semibold">{showCVV ? cvv : "•••"}</p>
                        </motion.div>
                    </div>
                </div>

                {/* Chip */}
                <motion.div className="top-20 left-4 md:left-6 absolute bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md w-12 h-9" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, type: "spring" }}>
                    <div className="flex justify-center items-center border-2 border-yellow-600/30 rounded-md w-full h-full">
                        <div className="gap-0.5 grid grid-cols-3">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="bg-yellow-700/50 rounded-full w-1 h-1" />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Card Actions */}
            {showActions && (
                <div className="bg-white m-auto mt-10 p-2 md:p-4 rounded-2xl max-w-[30rem]">
                    <p className="mb-4 font-semibold text-black text-base md:text-lg xl:text-xl text-center"><Setting2 className="inline mr-1 mb-1 size-5 md:size-6 xl:size-7" />Card Settings</p>
                    <motion.div className="gap-5 grid grid-cols-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                        <Button variant="outline" size="sm" onClick={() => setShowCardNumber(!showCardNumber)} className="flex items-center space-x-2 text-black">
                            {showCardNumber ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            <span>{showCardNumber ? "Hide" : "Show"} Number</span>
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => setShowCVV(!showCVV)} className="flex items-center space-x-2 text-black">
                            {showCVV ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            <span>{showCVV ? "Hide" : "Show"} CVV</span>
                        </Button>

                        <Button variant="outline" size="sm" onClick={copyCardNumber} className="flex items-center space-x-2 text-black">
                            {copied ? <CopySuccess className="size-4" /> : <Copy className="size-4" />}
                            <span>{copied ? "Copied!" : "Copy"}</span>
                        </Button>

                        <Button variant="outline" size="sm" onClick={handleCardFreeze} className="flex items-center space-x-2 text-black">
                            {updateProfile.isPending ? <Loader className="size-4 text-blue-600 animate-spin" /> : freezeCard ? <Unlock className="size-4" /> : <Lock className="size-4" />}
                            <span>{freezeCard ? "UnFreeze Card" : "Freeze Card"}</span>
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    )
}