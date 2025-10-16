//Utils
import { formatDate } from "@/utils/format";

//Components
import { Badge } from "@/components/ui/badge";

//Icons
import { ArrowDownLeft, Replace, FileText, CreditCard, BanknoteArrowUp, BanknoteArrowDown, ArrowLeftRight, Zap, Percent, ArrowUpRight, Undo2, TrendingUp, Wallet, Coins, PiggyBank, Banknote, CirclePause, CircleCheck, ClockFading, X, CheckCircle2, XCircle, Clock } from 'lucide-react';

//Transaction Icons
export const getIcon = (type: string, showText = false) => {
    switch (type) {
        case "withdrawal":
            return <p className="flex items-center gap-x-2"><ArrowDownLeft /> {showText && <span>Withdrawal</span>}</p>
        case "wire transfer":
            return <p className="flex items-center gap-x-2"><Replace /> {showText && <span>Wire Transfer</span>}</p>
        case "check":
            return <p className="flex items-center gap-x-2"><FileText />{showText && <span>Check</span>}</p>
        case "bill payment":
            return <p className="flex items-center gap-x-2"><CreditCard />{showText && <span>Bill Payment</span>}</p>
        case "ACH debit":
            return <p className="flex items-center gap-x-2"><BanknoteArrowUp />{showText && <span>ACH Debit</span>}</p>
        case "transfer":
            return <p className="flex items-center gap-x-2"><ArrowLeftRight />{showText && <span>Transfer</span>}</p>
        case "charge":
            return <p className="flex items-center gap-x-2"><Zap />{showText && <span>Charge</span>}</p>
        case "fee":
            return <p className="flex items-center gap-x-2"><Percent />{showText && <span>Fee</span>}</p>
        case "deposit":
            return <p className="flex items-center gap-x-2"><ArrowUpRight />{showText && <span>Deposit</span>}</p>
        case "ACH credit":
            return <p className="flex items-center gap-x-2"><BanknoteArrowDown />{showText && <span>ACH Credit</span>}</p>
        case "refund":
            return <p className="flex items-center gap-x-2"><Undo2 />{showText && <span>Refund</span>}</p>
        case "interest":
            return <p className="flex items-center gap-x-2"><TrendingUp />{showText && <span>Interest</span>}</p>
        case "cash back":
            return <p className="flex items-center gap-x-2"><Wallet />{showText && <span>Cash Back</span>}</p>
        case "cryptocurrency":
            return <p className="flex items-center gap-x-2"><Coins />{showText && <span>Cryptocurrency</span>}</p>
        case "savings":
            return <p className="flex items-center gap-x-2"><PiggyBank />{showText && <span>Savings</span>}</p>
        default:
            return <p className="flex items-center gap-x-2"><Banknote />{showText && <span>Transaction</span>}</p>
    }
}

// Transaction Status
export const getStatusBadge = (status: string) => {
    switch (status) {
        case "successful":
            return <Badge className="bg-green-100 hover:bg-green-200 text-green-600"><CircleCheck className="mr-0.5 size-4" />Successful</Badge>
        case "pending":
            return <Badge className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"><ClockFading className="mr-0.5 size-4" />Pending</Badge>
        case "reversed":
            return <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-600"><Undo2 className="mr-0.5 size-4" />Reversed</Badge>
        case "failed":
            return <Badge className="bg-red-100 hover:bg-red-100 text-red-600"><X className="mr-0.5 size-4" />Failed</Badge>
        case "disputed":
            return <Badge className="bg-amber-100 hover:bg-amber-200 text-amber-600"><CirclePause className="mr-0.5 size-4" />Disputed</Badge>
        default:
            return <Badge variant="secondary">{status}</Badge>
    }
}

// KYC Status Color
export const getColor = (status: "pending" | "accepted" | "rejected") => {
    switch (status) {
        case "rejected":
            return "text-red-600 bg-red-200"
        case "accepted":
            return "text-green-600 bg-green-200"
        case "pending":
            return "text-yellow-600 bg-yellow-200"
        default:
            return "text-yellow-600 bg-yellow-200"
    }
}

//Savings Badge
export const getSavingsBadge = (status: string) => {
    const variants = {
        active: "default",
        completed: "secondary",
        cancelled: "outline",
    } as const

    const styles = {
        active: "text-yellow-600 bg-yellow-100",
        completed: "text-green-600 bg-green-100",
        cancelled: "text-red-600 bg-red-100",
    } as const

    return (
        <Badge className={styles[status as keyof typeof styles]} variant={variants[status as keyof typeof variants]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}

//Activity Badge
export const getActionBadge = (action: string) => {
    const actionLower = action.toLowerCase()
    let variant: "default" | "secondary" | "destructive" | "outline" = "default"

    if (actionLower.includes("delete")) {
        variant = "destructive"
    } else if (actionLower.includes("created") || actionLower.includes("add")) {
        variant = "default"
    } else if (actionLower.includes("update") || actionLower.includes("edited")) {
        variant = "secondary"
    } else {
        variant = "outline"
    }

    return <Badge variant={variant}>{action}</Badge>
}

//Admin Badge
export const getRoleBadge = (role: string) => {
    const roleVariants: Record<string, "default" | "secondary"> = {
        super_admin: "default",
        admin: "secondary",
    }

    return (
        <Badge variant={roleVariants[role] || "outline"} className="text-xs">
            {role.replace("_", " ").toUpperCase()}
        </Badge>
    )
}

//Activity Meta Format
export const renderMetadataValue = (value: undefined | null | object | boolean | number | string): string => {
    if (value === null || value === undefined) return "N/A"
    if (typeof value === "object") return JSON.stringify(value, null, 2)
    if (typeof value === "boolean") return value ? "Yes" : "No"
    if (typeof value === "number") return value.toLocaleString()
    // Check if it's a date string
    if (typeof value === "string" && !isNaN(Date.parse(value)) && value.includes("T")) {
        return formatDate(value)
    }
    return String(value)
}

//Card Requests Status Color
export const getStatusColor = (status: string) => {
    switch (status) {
        case "successful":
            return "bg-green-500/10 text-green-700 dark:text-green-400"
        case "declined":
            return "bg-red-500/10 text-red-700 dark:text-red-400"
        case "pending":
            return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
        default:
            return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
}

//Card Request Status Icon
export const getStatusIcon = (status: string) => {
    switch (status) {
        case "successful":
            return <CheckCircle2 className="size-3" />
        case "declined":
            return <XCircle className="size-3" />
        case "pending":
            return <Clock className="size-3" />
        default:
            return null
    }
}