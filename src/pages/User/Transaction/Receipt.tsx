import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

//Enums, Types and Utils
import { Transaction } from "@/types";
import { TransactionStatus } from "@/enums";
import { formatCurrency } from "@/utils/format";

//Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PinPage from "../Transfer/PinPage";

//Icons
import { Download, PrinterIcon as Print, Share2, Check, Clock, AlertTriangle, X, RotateCcw, Shield, Calendar, User, Building2, ArrowUpRight, ArrowDownLeft, CheckCircle, Copy } from "lucide-react";

type ReceiptPageProps = {
    transaction: Transaction
    className?: string
}

const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
        case TransactionStatus.SUCCESSFUL:
            return (
                <Badge className="flex items-center space-x-1 bg-green-100 hover:bg-green-100 text-green-800">
                    <CheckCircle className="size-3" />
                    <span>Successful</span>
                </Badge>
            )
        case TransactionStatus.PENDING:
            return (
                <Badge className="flex items-center space-x-1 bg-yellow-100 hover:bg-yellow-100 text-yellow-800">
                    <Clock className="size-3" />
                    <span>Pending</span>
                </Badge>
            )
        case TransactionStatus.FAILED:
            return (
                <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                    <X className="size-3" />
                    <span>Failed</span>
                </Badge>
            )
        case TransactionStatus.REVERSED:
            return (
                <Badge className="flex items-center space-x-1 bg-purple-100 hover:bg-purple-100 text-purple-800">
                    <RotateCcw className="size-3" />
                    <span>Reversed</span>
                </Badge>
            )
        case TransactionStatus.DISPUTED:
            return (
                <Badge className="flex items-center space-x-1 bg-orange-100 hover:bg-orange-100 text-orange-800">
                    <AlertTriangle className="size-3" />
                    <span>Disputed</span>
                </Badge>
            )
        default:
            return <Badge variant="secondary">{status}</Badge>
    }
}

export default function ReceiptPage({ transaction, className = "" }: ReceiptPageProps) {

    const [copied, setCopied] = useState<boolean>(false);
    const [pinPage, setPinPage] = useState<boolean>(false);
    const printRef = useRef(null);

    const copyTransactionId = async () => {
        await navigator.clipboard.writeText(transaction.transactionId)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getTransactionIcon = () => {
        if (transaction.transactionType === "credit") {
            return <ArrowDownLeft className="size-6 text-green-600" />
        } else {
            return <ArrowUpRight className="size-6 text-red-600" />
        }
    }

    //Functions
    const handlePrint = () => window.print();

    const handleDownload = async () => {
        toast("Downloading PDF...", { isCloseBtn: true })
        const element = printRef.current;
        if (!element) return toast.error("Couldn't download PDF now, kindly try again later");

        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL();

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        //PDF Properties
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${transaction.transactionId.substring(0, 8)}.pdf`)
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Transaction Receipt",
                text: "Commerce Bank USA Transaction Receipt",
                url: window.location.href,
            })
        } else {
            toast("Share functionality would open here!", { isCloseBtn: true })
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            time: date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
        }
    }

    const { date, time } = formatDate(transaction.createdAt)

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }


    return (
        <>
            {pinPage && <PinPage transaction={transaction} onClose={() => setPinPage((prev) => !prev)} />}
            <div className={`min-h-dvh bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 ${className}`}>
                <div className="mx-auto max-w-4xl">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        {/* Header */}
                        <motion.div variants={itemVariants} className="mb-8 text-center">
                            <h1 className="font-bold text-slate-900 text-xl md:text-2xl xl:text-3xl">Transaction Receipt</h1>
                            <p className="font-medium text-slate-600">Commerce Bank USA</p>
                        </motion.div>
                        {/* Main Receipt Card */}
                        <motion.div ref={printRef} variants={itemVariants}>
                            <Card className="bg-white/90 shadow-xl backdrop-blur-sm mb-6 border-0">
                                <CardHeader className="pb-6 border-slate-200 border-b text-center">
                                    <div className="flex justify-center items-center mb-4">
                                        <div className="bg-slate-100 p-4 rounded-full">{getTransactionIcon()}</div>
                                    </div>
                                    <CardTitle className="mb-2 font-bold text-slate-900 text-2xl">
                                        {formatCurrency(transaction.amount)}
                                    </CardTitle>
                                    <div className="flex justify-center items-center space-x-2">{getStatusBadge(transaction.status)}</div>
                                    <p className="mt-2 text-slate-600">{transaction.description || "No description provided"}</p>
                                </CardHeader>

                                <CardContent className="p-4 md:p-6 xl:p-8">
                                    {/* Transaction Details */}
                                    <div className="gap-8 grid md:grid-cols-2 mb-8">
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="flex items-center space-x-2 mb-4 font-semibold text-slate-900 text-base md:text-lg xl:text-xl">
                                                    <Calendar className="size-5 text-primary" />
                                                    <span>Transaction Details</span>
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex flex-col gap-y-1">
                                                        <p className="text-slate-600">Transaction ID</p>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-mono text-slate-900 break-all">{transaction.transactionId}</span>
                                                            <Button variant="ghost" size="lg" onClick={copyTransactionId} className="hover:bg-slate-100 p-0 size-6 shrink-0">
                                                                {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Date</span>
                                                        <span className="font-medium text-slate-900">{date}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Time</span>
                                                        <span className="font-medium text-slate-900">{time}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Type</span>
                                                        <span className="font-medium text-slate-900 capitalize">{transaction.subType}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Initiated By</span>
                                                        <span className="font-medium text-slate-900 capitalize">{transaction.initiatedBy}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {transaction.details && transaction.details !== null &&
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="flex items-center space-x-2 mb-4 font-semibold text-slate-900 text-base md:text-lg xl:text-xl">
                                                        <Building2 className="size-5 text-primary" />
                                                        <span>Account Information</span>
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {transaction.details && transaction.details.accountNumber !== null && (
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-600">{transaction.subType === "cryptocurrency" ? "Wallet Address" : "Account Number"}</span>
                                                                <span className="font-mono text-slate-900 text-sm">
                                                                    ****{transaction.details.accountNumber.slice(-4)}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {transaction.details && transaction.details.fullName !== null && (
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-600">Account Holder</span>
                                                                <span className="font-medium text-slate-900">{transaction.details.fullName}</span>
                                                            </div>
                                                        )}
                                                        {transaction.details && transaction.details.balanceAfterTransaction && (
                                                            <div className="flex justify-between">
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
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {/* Recipient Information (if applicable) */}
                                    {(transaction.details && (transaction.details.recipient || transaction.details.bankName)) && (
                                        <>
                                            <Separator className="my-8" />
                                            <div>
                                                <h3 className="flex items-center space-x-2 mb-4 font-semibold text-slate-900 text-base md:text-lg xl:text-xl">
                                                    <User className="size-5 text-primary" />
                                                    <span>Recipient Information</span>
                                                </h3>
                                                <div className="gap-6 grid md:grid-cols-2">
                                                    {transaction.details.recipient && (
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">Recipient</span>
                                                            <span className="font-medium text-slate-900">{transaction.details.recipient}</span>
                                                        </div>
                                                    )}
                                                    {transaction.details.bankName && (
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-600">{transaction.subType === "cryptocurrency" ? "Cryptocurrency Coin" : "Bank"}</span>
                                                            <span className="font-medium text-slate-900 capitalize">{transaction.details.bankName}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Additional Details */}
                                    {transaction.details && transaction.details.otherDetails && (
                                        <>
                                            <Separator className="my-8" />
                                            <div>
                                                <h3 className="mb-4 font-semibold text-slate-900 text-base md:text-lg xl:text-xl">Additional Details</h3>
                                                <p className="bg-slate-50 p-4 rounded-lg text-slate-600 capitalize">
                                                    {transaction.subType === "cryptocurrency" && (<>1 {transaction.details.bankName} = </>)} <span className="font-bold text-black">{transaction.details.otherDetails}</span> {transaction.subType === "cryptocurrency" && "USD at the time of transaction"}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {/* Complete Transaction Button for Pending */}
                                    {transaction.status === TransactionStatus.PENDING && (
                                        <>
                                            <Separator className="my-8" />
                                            <div className="text-center">
                                                <div className="bg-yellow-50 mb-6 p-6 border border-yellow-200 rounded-lg">
                                                    <Clock className="mx-auto mb-3 w-8 h-8 text-yellow-600" />
                                                    <h4 className="mb-2 font-semibold text-yellow-800 text-base md:text-lg xl:text-xl">Transaction Pending</h4>
                                                    <p className="mb-4 text-yellow-700">
                                                        This transaction is currently pending and requires completion.
                                                    </p>
                                                    <Button onClick={() => setPinPage((prev) => !prev)} className="font-medium text-white" style={{ backgroundColor: "#1D9B5E" }}> <CheckCircle className="mr-2 size-4" /> Complete Transaction </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
                            <Button onClick={handlePrint} variant="outline" className="flex items-center space-x-2 bg-primary hover:bg-primaryYellow hover:text-black duration-300">
                                <Print className="size-4" />
                                <span>Print Receipt</span>
                            </Button>

                            <Button onClick={handleDownload} variant="outline" className="flex items-center space-x-2 bg-primary hover:bg-primaryYellow hover:text-black duration-300">
                                <Download className="size-4" />
                                <span>Download PDF</span>
                            </Button>

                            <Button onClick={handleShare} variant="outline" className="flex items-center space-x-2 bg-primary hover:bg-primaryYellow hover:text-black duration-300">
                                <Share2 className="size-4" />
                                <span>Share Receipt</span>
                            </Button>
                        </motion.div>

                        {/* Security Notice */}
                        <motion.div variants={itemVariants}>
                            <Card className="bg-slate-50/80 shadow-lg backdrop-blur-sm border-0">
                                <CardContent className="p-6 text-center">
                                    <Shield className="mx-auto mb-3 size-6 text-primary" />
                                    <h4 className="mb-2 font-semibold text-slate-900">Secure Transaction</h4>
                                    <p className="text-slate-600">
                                        This receipt is digitally secured and verified by Commerce Bank USA. Keep this receipt for your
                                        records and contact us immediately if you notice any discrepancies.
                                    </p>
                                    <p className="mt-3 text-slate-500 text-xs">Customer Service: support@commercebankusa.com | Available 24/7</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
