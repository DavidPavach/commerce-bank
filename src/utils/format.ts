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
export const formatDate = (dateString: Date) => {
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