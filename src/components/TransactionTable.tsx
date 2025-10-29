import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

//Utils and Enums
import { formatCurrency, formatDate } from "@/utils/format";
import { Transaction } from "@/types";
import { SubType } from "@/enums";
import { getIcon, getStatusBadge } from "./Utils";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

//Icons
import { Eye, Filter } from "lucide-react";
import { Receipt1 } from "iconsax-react";



const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {

    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedType, setSelectedType] = useState("all")

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    //Functions
    const filteredTransactions = transactions.filter((transaction) => {
        const categoryMatch = selectedCategory === "all" || transaction.subType === selectedCategory;
        const typeMatch = selectedType === "all" || transaction.transactionType === selectedType;
        return categoryMatch && typeMatch;
    });

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-white shadow-lg mt-4 mb-6 border-0">
                    <CardContent className="p-4">
                        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
                            <p className="text-neutral-500">Filter Transactions</p>
                            <div className="flex gap-3">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E] focus:ring-[#1D9B5E] w-40">
                                        <Filter className="mr-2 size-4" />
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        {Object.values(SubType).map((type) => (
                                            <SelectItem className="text-xs md:text-sm xl:text-base capitalize" key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="border-slate-200 focus:border-[#1D9B5E] focus:ring-[#1D9B5E] w-32">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem className="text-xs md:text-sm xl:text-base" value="all">All Types</SelectItem>
                                        <SelectItem className="text-xs md:text-sm xl:text-base" value="credit">Credits</SelectItem>
                                        <SelectItem className="text-xs md:text-sm xl:text-base" value="debit">Debits</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <Card className="bg-white shadow-xl backdrop-blur-sm border-0">
                    <CardHeader className="border-slate-200 border-b">
                        <CardTitle className="flex flex-1 font-semibold text-slate-900 text-sm md:text-base xl:text-lg"><Receipt1 className="size-5 md:size-6 xl:size-7" /> Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-slate-200 border-b">
                                    <tr>
                                        <th className="p-4 font-medium text-slate-700 text-left">S/N</th>
                                        <th className="p-4 font-medium text-slate-700 text-left">Description</th>
                                        <th className="p-4 font-medium text-slate-700 text-right">Amount</th>
                                        <th className="p-4 font-medium text-slate-700 text-center">Status</th>
                                        <th className="p-4 font-medium text-slate-700 text-left">Date & Time</th>
                                        <th className="p-4 font-medium text-slate-700 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((transaction, index) => (
                                        <motion.tr variants={itemVariants} key={transaction._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-2 text-right">{index + 1}</td>
                                            <td className="p-2">
                                                <div className="flex items-start space-x-3">
                                                    <div className={`p-2 rounded-lg bg-white ${transaction.transactionType === "credit" ? "bg-green-200 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                        {getIcon(transaction.subType)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-slate-900 truncate capitalize">{transaction.subType}</p>
                                                        <p className="text-slate-600 text-sm truncate">{transaction.description && transaction.description.length > 0 ? transaction.description : "No Description"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 text-right">
                                                <span className={`font-semibold ${transaction.transactionType === "credit" ? "text-green-600" : "text-red-600"}`}>
                                                    {formatCurrency(transaction.amount)}
                                                </span>
                                            </td>

                                            <td className="p-2 text-center">{getStatusBadge(transaction.status)}</td>

                                            <td className="p-2">
                                                <div className="flex flex-col">
                                                    <span className="min-w-32 font-medium text-slate-900">
                                                        {formatDate(new Date(transaction.createdAt))}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <Link to={`/user/transaction/${transaction._id}`} className="flex justify-center items-center hover:text-primary cursor-pointer">
                                                    <Eye className="size-4 md:size-5" />
                                                    <span>View</span>
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
}

export default TransactionTable;
