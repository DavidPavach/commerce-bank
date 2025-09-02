import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Utils and Hooks
import { formatCurrency, formatDate, formatHash, maskNumber } from "@/utils/format";
import { useDepositUpdateRequest } from "@/services/mutations.service";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

//Icons
import { Copy, MoneyRecive, Check } from "iconsax-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, Edit3, Save, X } from "lucide-react";

const getStatusBadge = (status: string) => {
    switch (status) {
        case "successful":
            return (
                <Badge className="flex items-center space-x-1 bg-green-100 hover:bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3" />
                    <span>Successful</span>
                </Badge>
            )
        case "pending":
            return (
                <Badge className="flex items-center space-x-1 bg-yellow-100 hover:bg-yellow-100 text-yellow-800">
                    <Clock className="w-3 h-3" />
                    <span>Pending</span>
                </Badge>
            )
        case "failed":
            return (
                <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                    <X className="w-3 h-3" />
                    <span>Failed</span>
                </Badge>
            )
        default:
            return <Badge variant="secondary">{status}</Badge>
    }
}

const getAcceptanceBadge = (isAccepted: string) => {
    switch (isAccepted) {
        case "accepted":
            return (
                <Badge className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-100 text-blue-800">
                    <CheckCircle className="w-3 h-3" />
                    <span>Accepted</span>
                </Badge>
            )
        case "pending":
            return (
                <Badge className="flex items-center space-x-1 bg-orange-100 hover:bg-orange-100 text-orange-800">
                    <Clock className="w-3 h-3" />
                    <span>Under Review</span>
                </Badge>
            )
        case "declined":
            return (
                <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Declined</span>
                </Badge>
            )
        default:
            return <Badge variant="secondary">{isAccepted}</Badge>
    }
}

const DepositDetails = ({ deposit }: { deposit: Deposits }) => {

    const [copied, setCopied] = useState<string | null>(null)
    const [editingHash, setEditingHash] = useState<boolean>(false);
    const [editHash, setEditHash] = useState("")

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    //Functions
    const copyToClipboard = async (text: string, type: string) => {
        await navigator.clipboard.writeText(text)
        setCopied(`${type}-${text}`)
        setTimeout(() => setCopied(null), 2000)
    }

    const updateHash = useDepositUpdateRequest();
    const handleUpdateHash = () => {
        
        toast("Updating Hash...", { isCloseBtn: true });

        updateHash.mutate({ id: deposit._id, hash: editHash }, {
            onSuccess: (response) => {
                toast.success(response.message || "Your Hash was Updated Successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Hash Update Request failed, kindly try again later.";
                toast.error(message);
            },
        })
    }

    return (
        <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Card className="bg-white/90 shadow-lg backdrop-blur-sm border-0">
                <CardContent className="p-4 md:p-6">
                    <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                        {/* Left Section - Main Info */}
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-4">
                                <div className="bg-[#1D9B5E]/10 p-3 rounded-full">
                                    <MoneyRecive className="size-6 text-[#1D9B5E]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-xl">{formatCurrency(deposit.amount)}</h3>
                                    <p className="text-slate-600 text-sm">
                                        Requested on {formatDate(deposit.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="gap-4 grid md:grid-cols-2">
                                <div>
                                    <Label className="text-slate-500 text-xs">DEPOSIT ID</Label>
                                    <div className="flex items-center space-x-2">
                                        <p className="font-mono text-[11px] text-slate-900 md:text-xs xl:text-sm">{maskNumber(deposit._id)}</p>
                                        <CheckCircle className="size-3 text-green-600" />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-slate-500 text-xs">TRANSACTION HASH</Label>
                                    <div className="flex items-center space-x-2">
                                        <p className="font-mono text-[11px] text-slate-900 md:text-xs xl:text-sm">{deposit.hash ? formatHash(deposit.hash) : "No Hash"}</p>
                                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(deposit.hash, "hash")} className="hover:bg-slate-100 p-0 w-6 h-6">
                                            {copied === `hash-${deposit.hash}` ? (
                                                <Check className="size-3" />
                                            ) : (
                                                <Copy className="size-3" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Status & Actions */}
                        <div className="flex flex-col items-start lg:items-end space-y-3">
                            <div className="flex flex-col space-y-2">
                                {getStatusBadge(deposit.status)}
                                {getAcceptanceBadge(deposit.isAccepted)}
                            </div>

                            {/* Hash Edit Button - Only for accepted deposits */}
                            {deposit.isAccepted === "accepted" && deposit.hash === undefined && (
                                <div className="flex space-x-2">
                                    {editingHash ? (
                                        <div className="flex items-center space-x-2">
                                            <Input placeholder="Enter new hash" value={editHash} onChange={(e) => setEditHash(e.target.value)} className="w-48 h-8 text-xs" />
                                            <Button size="sm" onClick={handleUpdateHash} disabled={!editHash} className="h-8 text-white" style={{ backgroundColor: "#1D9B5E" }}>
                                                <Save className="size-3" />
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8" onClick={() => { setEditingHash(false) }}>
                                                <X className="size-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button size="sm" variant="outline" className="bg-transparent hover:border-[#1D9B5E] hover:text-[#1D9B5E]"
                                            onClick={() => { setEditingHash(false) }}>
                                            <Edit3 className="mr-1 size-3" />
                                            Edit Hash
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Status Messages */}
                            {deposit.isAccepted === "declined" && (
                                <div className="bg-red-50 px-2 py-1 rounded text-red-600 text-xs">
                                    Request declined - Contact support for details
                                </div>
                            )}

                            {deposit.isAccepted === "pending" && (
                                <div className="bg-orange-50 px-2 py-1 rounded text-orange-600 text-xs">
                                    Under review - Hash editing disabled
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default DepositDetails;