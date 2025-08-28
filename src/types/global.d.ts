//Fancy Button
declare type FancyButtonProps = {
    text: string;
    loadingText?: string;
    icon?: React.ReactNode;
    onClick?: () => Promise<void> | void | string;
    variant?: "primary" | "secondary" | "success";
    size?: "sm" | "md" | "lg";
    disabled: boolean;
    loading: boolean;
}

//Create User Data
declare type UserCreation = {
    email: string;
    password: string;
    fullName: string;
    country: string;
    phoneNumber: string;
}

//Error Component
declare type ErrorDisplayProps = {
    title?: string
    message?: string
    retryLabel?: string
    isFullPage?: boolean
    onRetry?: () => unknown | Promise<unknown>;
}

//User Data
declare type User = {
    _id: string,
    email: string,
    fullName: string,
    country: string,
    address: string,
    phoneNumber: string,
    encryptedPassword: string,
    accountId: string,
    accountNumber: string,
    gender: male,
    kyc?: {
        images: string[];
        idType: string;
        status: 'pending' | 'accepted' | 'rejected';
        lastSubmissionDate: Date;
    };
    profilePicture: string,
    transferPin: string | null,
    freezeCard: boolean,
    taxPin: string | null,
    tacPin: string | null,
    insurancePin: string | null,
    isVerified: boolean,
    isFullyVerified: boolean,
    isSuspended: boolean,
    suspendedDate: Date | null,
    minimumTransfer: number | null,
    isOnline: boolean,
    lastSession?: Date;
    createdAt: Date
}

//Get Current User Response
declare type GetDetailsResponse = {
    status: number,
    success: boolean;
    message: string;
    data: User
}

//Get Prices
declare type Prices = Record<string, { usd: number; usd_24h_change: number }>;

//User Store
declare type UserStore = {
    user: User | null;
    balance: number | null;
    prices: Prices | null;
    setUser: (user: User) => void;
    setBalance: (balance: Balance) => void;
    setPrices: (prices: Prices) => void;
    refetchUserData: () => Promise<void>;
    refetchPrices: () => Promise<void>;
    clearUser: () => void;
}

//Currencies
declare type Currencies = {
    AUD: number;
    BGN: number;
    BRL: number;
    CAD: number;
    CHF: number;
    CNY: number;
    CZK: number;
    DKK: number;
    EUR: number;
    GBP: number;
    HKD: number;
    HRK: number;
    HUF: number;
    IDR: number;
    ILS: number;
    INR: number;
    ISK: number;
    JPY: number;
    KRW: number;
    MXN: number;
    MYR: number;
    NOK: number;
    NZD: number;
    PHP: number;
    PLN: number;
    RON: number;
    RUB: number;
    SEK: number;
    SGD: number;
    THB: number;
    TRY: number;
    USD: number;
    ZAR: number;
}

//Card
declare type Card = {
    _id: string;
    user: string;
    cardNumber: string;
    cardExpiryDate: string;
    cardCVV: string;
    status: "pending" | "declined" | "successful";
    createdAt: Date;
}

//Get Current User Response
declare type GetCardRequestResponse = {
    status: number,
    success: boolean;
    message: string;
    data: Card
}

//Beneficiaries
declare type Beneficiary = {
    _id: string;
    user: string;
    fullName: string;
    accountNumber: string;
    bankName: string;
    note: string;
    createdAt: Date;
}

//Account Details
declare type AccountDetails = {
    fullName: string;
    accountNumber: string;
    bankName: string;
    _id: string;
    createdAt: Date;
}

//Savings
declare type Savings = {
    _id: string;
    user: string;
    title: string;
    targetAmount?: number;
    savedAmount: number;
    interestRate: number;
    startDate: Date;
    endDate?: Date;
    totalInterestAccrued: number;
    lastInterestDate: Date;
    status: "active" | "completed" | "cancelled";
    createdAt: Date;
}

//Create new Savings
declare type SavingsFormData = {
    title: string;
    targetAmount: string;
    savedAmount: string;
    startDate: string;
    endDate: string;
}

//Currency Info
declare type CurrencyInfo = {
    code: keyof Currencies;
    name: string;
    symbol: string;
}

//Deposit Request
declare type Deposits = {
    user: string;
    _id: string;
    amount: number;
    isAccepted: "accepted" | "declined", "pending";
    hash: string;
    status: "successful" | "failed" | "pending";
    createdAt: Date;
}