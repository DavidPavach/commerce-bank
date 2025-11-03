import { create } from "zustand";

// Enums
import { SubType } from "@/enums";
import { CreateTransaction } from "./../types/index.d";

// Zustand store type
type TransactionStore = {
  transaction: CreateTransaction;
  updateTransaction: (data: Partial<CreateTransaction>) => void;
  updateDetails: (data: Partial<CreateTransaction["details"]>) => void;
  updateDetailField: <K extends keyof CreateTransaction["details"]>(
    field: K,
    value: CreateTransaction["details"][K]
  ) => void;
  resetTransaction: () => void;
  isTransactionValid: () => boolean;
};

// Default state
const defaultTransaction: CreateTransaction = {
  transactionType: "debit",
  subType: SubType.WIRE,
  amount: 0,
  description: "",
  details: {
    accountNumber: "",
    recipient: null,
    fullName: "",
    bankName: "",
    otherDetails: "",
  },
  isInternational: false,
  bankAddress: "",
  routingNumber: "",
  recipientAddress: "",
  swiftCode: "",
  country: "",
  beneficiary: false,
  note: "",
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transaction: defaultTransaction,

  // Update top-level transaction fields
  updateTransaction: (data) =>
    set((state) => ({
      transaction: { ...state.transaction, ...data },
    })),

  // Update multiple details fields at once
  updateDetails: (data) =>
    set((state) => ({
      transaction: {
        ...state.transaction,
        details: { ...state.transaction.details, ...data },
      },
    })),

  // Update a single field inside details
  updateDetailField: (field, value) =>
    set((state) => ({
      transaction: {
        ...state.transaction,
        details: { ...state.transaction.details, [field]: value },
      },
    })),

  // Reset to default
  resetTransaction: () => set({ transaction: defaultTransaction }),

  isTransactionValid: () => {
    const { transaction } = get();

    const requiredFieldsFilled =
      transaction.transactionType &&
      transaction.subType &&
      transaction.details.accountNumber.trim() !== "" &&
      transaction.details.fullName.trim() !== "" &&
      transaction.details.bankName.trim() !== "" &&
      transaction.amount > 0 &&
      typeof transaction.beneficiary === "boolean";

    return requiredFieldsFilled;
  },
}));
