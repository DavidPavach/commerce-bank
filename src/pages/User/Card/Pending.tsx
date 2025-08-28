import { motion } from "framer-motion";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

//Utils
import { formatDate } from "@/utils/format";

//Icons
import { Clock } from "iconsax-react";
import { CheckCircle, X } from "lucide-react";

const Pending = ({ card }: { card: Card }) => {

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "successful":
                return (
                    <Badge className="flex items-center space-x-1 bg-green-100 hover:bg-green-100 text-green-800">
                        <CheckCircle className="size-3" />
                        <span>Active</span>
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="flex items-center space-x-1 bg-yellow-100 hover:bg-yellow-100 text-yellow-800">
                        <Clock className="size-3" />
                        <span>Pending</span>
                    </Badge>
                )
            case "declined":
                return (
                    <Badge className="flex items-center space-x-1 bg-red-100 hover:bg-red-100 text-red-800">
                        <X className="size-3" />
                        <span>Declined</span>
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <motion.div variants={itemVariants} className="place-content-center grid mt-20">
            <div>
                <motion.div variants={itemVariants}>
                    <Card className="bg-white/90 shadow-lg backdrop-blur-sm border-0">
                        <CardContent className="p-4 md:p-6">
                            <div className="text-center">
                                <div className="flex justify-center items-center bg-yellow-100 mx-auto mb-4 rounded-full size-12 md:size-14 xl:size-16">
                                    <Clock className="size-6 md:size-7 xl:size-8 text-yellow-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-slate-900 text-sm md:text-base xl:text-lg">Card Request Pending</h3>
                                <p className="mb-4 text-[11px] text-slate-600 md:text-xs xl:text-sm">
                                    Your card request is being processed. You'll receive an update within 3-5 business days.
                                </p>
                                <div className="space-y-2 text-[11px] md:text-xs xl:text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Requested</span>
                                        <span>{formatDate(card.createdAt)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Status</span>
                                        {getStatusBadge(card.status)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Pending;