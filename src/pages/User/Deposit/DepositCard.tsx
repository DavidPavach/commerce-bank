import { useState } from "react";
import { motion } from "framer-motion";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

//Icons
import { FileText, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DepositDetails from "./DepositDetails";

const DepositCard = ({ deposits }: { deposits: Deposits[] }) => {

    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const filteredDeposits = deposits.filter((deposit) => {
        const matchesSearch =
            searchTerm === "" ||
            deposit.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deposit.amount.toString().includes(searchTerm)

        const matchesStatus = statusFilter === "all" || deposit.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-lg backdrop-blur-sm border-0">
                <CardContent className="p-4 md:p-6">
                    <div className="flex md:flex-row flex-col gap-4">
                        <div className="flex-1">
                            <Label htmlFor="search">Search Deposits</Label>
                            <div className="relative mt-1">
                                <Search className="top-1/2 left-3 absolute size-4 text-slate-400 -translate-y-1/2 transform" />
                                <Input id="search" placeholder="Search by hash or amount" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-neutral-400" />
                            </div>
                        </div>
                        <div className="w-full md:w-48">
                            <Label htmlFor="status-filter">Filter by Status</Label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="mt-1 border-neutral-400">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="text-xs md:text-sm xl:text-base" value="all">All Status</SelectItem>
                                    <SelectItem className="text-xs md:text-sm xl:text-base" value="successful">Successful</SelectItem>
                                    <SelectItem className="text-xs md:text-sm xl:text-base" value="pending">Pending</SelectItem>
                                    <SelectItem className="text-xs md:text-sm xl:text-base" value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {filteredDeposits.length === 0 ? (
                <Card className="bg-white shadow-lg backdrop-blur-sm mt-4 border-0">
                    <CardContent className="p-12 text-center">
                        <FileText className="mx-auto mb-4 size-12 md:size-14 xl:size-16 text-slate-300" />
                        <h3 className="mb-2 font-semibold text-slate-900 text-xl">No Deposits Found</h3>
                        <p className="mb-6 text-slate-600">
                            {searchTerm || statusFilter !== "all"
                                ? "No deposits match your current filters."
                                : "You haven't made any deposit requests yet."}
                        </p>
                        <Button onClick={() => { setSearchTerm(""); setStatusFilter("all") }} variant="outline" className="border-neutral-400">
                            <RefreshCw className="mr-2 size-4" />
                            Clear Filters
                        </Button>
                    </CardContent>
                </Card>)
                : (
                    <section className="flex flex-col gap-y-3 mt-4">
                        {deposits.map((deposit) => (
                            <DepositDetails key={deposit._id} deposit={deposit} />
                        ))}
                    </section>
                )}
        </motion.div>
    );
}

export default DepositCard;