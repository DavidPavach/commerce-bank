//Check if Pin is Sequential
export function isSequentialPin(pin: string): boolean {
    if (!/^\d+$/.test(pin)) return false;

    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < pin.length; i++) {
        const prev = parseInt(pin[i - 1]);
        const curr = parseInt(pin[i]);

        if (curr !== prev + 1) isIncreasing = false;
        if (curr !== prev - 1) isDecreasing = false;
    }

    return isIncreasing || isDecreasing;
}

//Format Date and Time
export const formatDate = (dateString: Date | string | number) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

//Format currency
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(value)
}

//Format Currency
export const formatCryptoAmount = (value: number) => {
    if (value < 0.01) return value.toFixed(4);
    if (value < 1) return value.toFixed(3);
    if (value < 1000) return value.toFixed(2);
    return value.toFixed(2);
};

//Format Coin Percentage
export const formatPercentage = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

//Mask Number
export function maskNumber(number: string | number, visibleDigits: number = 4): string {
    const numStr = number.toString();
    const length = numStr.length;

    if (visibleDigits >= length) return numStr;

    const maskedSection = '*'.repeat(length - visibleDigits);
    const visibleSection = numStr.slice(-visibleDigits);

    return maskedSection + visibleSection;
}

// Format card number with spaces every 4 digits
export const formatCardNumber = (number: string) => {
    return number.replace(/(.{4})/g, "$1 ").trim()
}

export const maskCardNumber = (cardNumber: string) => {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`
}

//Format Hash
export const formatHash = (hash: string) => {
    if (hash.length <= 16) return hash
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`
}

//Get Savings Percent
export const getProgressPercentage = (saved: number, target: number) => {
    return Math.min((saved / target) * 100, 100)
}

//Format Meta Key
export const formatMetadataKey = (key: string): string => {
    // Convert camelCase or snake_case to Title Case
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .trim()
}

// Generate Random 6 Digits
export const randomSix = (): number => {
    return Math.floor(Math.random() * 900000) + 100000;
}

//Get Name Initials
export const getInitials = (name: string): string => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
}

//Format Last Session
export function formatLastSession(date: string | Date ): string {
    if (!date) return 'Unknown';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return 'Unknown';

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0) return 'Just now';

    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return `${sec} ${sec === 1 ? 'second' : 'seconds'} ago`;

    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} ${min === 1 ? 'minute' : 'minutes'} ago`;

    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`;

    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;

    // For older dates include localized date + time
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
    };
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, timeOptions)}`;
}
