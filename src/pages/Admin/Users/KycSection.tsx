//Utils
import { formatDate } from "@/utils/format";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


interface KYCSectionProps {
    kyc?: {
        images: string[]
        idType: string
        status: "pending" | "accepted" | "rejected"
        lastSubmissionDate: Date
    }
}

export function KYCSection({ kyc }: KYCSectionProps) {
    if (!kyc || !kyc.images || !kyc.idType || !kyc.lastSubmissionDate) {
        return (
            <Card className="shadow-sm border-neutral-200">
                <CardHeader>
                    <CardTitle className="text-lightBlack">KYC Verification</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-neutral-500">No KYC information available or Incomplete KYC details</p>
                </CardContent>
            </Card>
        )
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "accepted":
                return "bg-green-100 text-green-800 hover:bg-green-100"
            case "rejected":
                return "bg-red-100 text-red-800 hover:bg-red-100"
            case "pending":
                return "bg-primary/20 text-primary hover:bg-primary/20"
            default:
                return ""
        }
    }

    return (
        <Card className="shadow-sm border-neutral-200">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lightBlack">KYC Verification</CardTitle>
                    <Badge className={getStatusColor(kyc.status)}>
                        {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                        <p className="font-medium text-neutral-500">ID Type</p>
                        <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{kyc.idType}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-neutral-500">Last Submission</p>
                        <p className="font-medium text-lightBlack text-sm md:text-base xl:text-lg">{formatDate(kyc.lastSubmissionDate)}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-medium text-neutral-500">Submitted Documents</p>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        {kyc.images.map((image, index) => (
                            <div key={index} className="group relative">
                                <img
                                    src={image || "/profile.jpeg"}
                                    alt={`KYC Document ${index + 1}`}
                                    className="border border-neutral-200 rounded-lg w-full h-48 md:h-60 xl:h-80 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
