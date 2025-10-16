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
    gender: 'male' | 'female' | 'prefer not to say',
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
    transactionSuspended: boolean,
    isVerified: boolean,
    isFullyVerified: boolean,
    isSuspended: boolean,
    suspendedDate: Date | null,
    minimumTransfer: number | null,
    isOnline: boolean,
    lastSession?: Date;
    createdAt: Date
}

//Patch User
declare type PatchUser = {
    email: string,
    fullName?: string,
    country?: string,
    address?: string,
    phoneNumber?: string,
    transferPin?: string,
    password?: string,
    accountNumber?: string,
    gender?: 'male' | 'female' | 'prefer not to say',
    freezeCard?: boolean,
    isFullyVerified?: boolean,
    isSuspended?: boolean,
    taxPin?: string,
    tacPin?: string,
    insurancePin?: string,
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
    isAccepted: "accepted" | "declined" | "pending";
    hash: string;
    status: "successful" | "failed" | "pending";
    createdAt: Date;
}

//Update Deposit Request
declare type UpdateDeposit = {
    id: string;
    isAccepted?: "accepted" | "declined" | "pending";
    status?: "successful" | "failed" | "pending";
    hash?: string;
}

//Admin

//DownBar and SideBar NavItem
declare type NavItem = {
    href: string;
    icon: React.ElementType;
    label: string;
}

//Edit Account
declare type EditAccount = {
    accountId: string,
    accountNumber?: string,
    fullName?: string,
    bankName?: string,
}

//Savings with User Details
declare type SavingsWithUser = Savings & {
    user: {
        fullName: string;
        email: string;
        profilePicture: string;
        _id: string;
        isFullyVerified: boolean;
        isOnline: boolean;
        isVerified: boolean;
    }
}

//Admin Activity
declare type Activity = {
    _id: string
    action: string
    admin: {
        email: string
        role: string
        _id: string
    }
    createdAt: string
    metadata: Record<string, string | Date | number>
    target: string
    updatedAt: string
    __v?: number
}

//Card Requests
declare type CardRequest = {
    _id: string;
    cardCVV: string;
    cardExpiryDate: string;
    cardNumber: string;
    createdAt: string;
    status: "successful" | "declined" | "pending";
    updatedAt: string;
    user: {
        email: string;
        fullName: string;
        isFullyVerified: boolean;
        isOnline: boolean;
        isVerified: boolean;
        profilePicture: string;
        _id: string;
    }
}

//Edit Admin
declare type PatchAdmin = {
    adminId: string,
    email?: string,
    password?: string,
    role?: "admin" | "super_admin",
    isSuspended?: boolean
}

//Admin
declare type Admin = {
    createdAt: string;
    email: string;
    adminId: string;
    encryptedPassword: string;
    role: "admin" | "super_admin";
    _id: string;
    isSuspended: boolean;
    lastSession?: string | Date | null;
}

//Messages
declare type Message = {
    id: string;
    from: string;
    to: string;
    text: string;
    timestamp: string | Date | number;
    status: 'pending' | 'successful' | 'failed'
}

declare type Conversation = {
    userId: string;
    unreadCount: number;
    messages: Message[];
    userPreview?: UserPreview;
};

declare type UserPreview = {
    fullName: string;
    email: string;
    profilePicture: string;
    lastSession: string | Date | undefined;
    isOnline: boolean;
    isSuspended: boolean;
    isFullyVerified: boolean;
    _id: string;
}

//ChatState
declare type ChatState = {
    selfId: string | null;
    conversations: Conversation[];
    activeUser: UserPreview | null;
    activeConversationId: string | null;
    typingUsers: Record<string, boolean>;

    // Actions
    setSelfId: (id: string) => void;
    setConversations: (convs: Conversation[]) => void;
    setActiveUser: (user: UserPreview | null) => void;
    addMessage: (msg: Message) => void;
    updateMessageStatus: (id: string, status: 'pending' | 'successful' | 'failed') => void;
    deleteMessage: (messageId: string) => void;
    replaceMessage: (id: string, newData: Message) => void;
    setTyping: (userId: string, isTyping: boolean) => void;
    resetUnread: (userId: string) => void;
    setActiveConversation: (userId: string) => void;
    reset: () => void;
};