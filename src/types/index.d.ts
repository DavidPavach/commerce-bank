//Enums
import { SubType, TransactionStatus } from "@/enums";

//Transaction
export type Transaction = {
    _id: string;
    user: string;
    transactionType: "credit" | "debit" | string;
    subType: SubType | string;
    description: string | null;
    amount: number;
    details: {
        accountNumber: string | null;
        recipient: string | null;
        fullName: string | null;
        bankName: string | null;
        otherDetails: string | null;
        balanceAfterTransaction: number | null;
    };
    level: string;
    status: TransactionStatus | string;
    transactionId: string;
    initiatedBy: "user" | "admin" | "system" | string;
    createdAt: string;
}

//Create Transaction
export type CreateTransaction = {
    transactionType: "credit" | "debit";
    subType: SubType;
    amount: number;
    description?: string;
    details: {
        accountNumber: string;
        recipient?: null | string;
        fullName: string;
        bankName: string;
        otherDetails?: string
    },
    beneficiary?: boolean;
    note?: string;
}