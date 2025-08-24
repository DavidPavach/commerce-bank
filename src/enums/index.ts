// ID Types
export const ID_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "national_id", label: "National ID Card" },
  { value: "residence_permit", label: "Residence Permit" },
]

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer not to say", label: "Prefer not to say" },
]

// Maximum file size (20MB in bytes)
export const MAX_FILE_SIZE = 20 * 1024 * 1024

//Coin Logos, Symbol and Name
export const coinMeta: Record<string, { name: string; symbol: string; logo: string }> = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", logo: "/bitcoin.jpg" },
  ethereum: { name: "Ethereum", symbol: "ETH", logo: "/ethereum.jpg" },
  tether: { name: "Tether", symbol: "USDT", logo: "/tether.jpg" },
  solana: { name: "Solana", symbol: "SOL", logo: "/solana.jpg" },
  texel: { name: "Texel", symbol: "TXL", logo: "/logo.svg" },
  dash: { name: "Dash", symbol: "DASH", logo: "/dash.jpg" },
  "bitcoin-cash": { name: "Bitcoin Cash", symbol: "BCH", logo: "/bitcoin cash.jpg" },
};

//Transaction Type Enum
export enum SubType {
  WITHDRAWAL = "withdrawal",
  WIRE = "wire transfer",
  CHECK = "check",
  BILL = "bill payment",
  ACH_DEBIT = "ACH debit",
  TRANSFER = "transfer",
  CHARGE = "charge",
  FEE = "fee",
  DEPOSIT = "deposit",
  ACH_CREDIT = "ACH credit",
  REFUND = "refund",
  INTEREST = "interest",
  CASH_BACK = "cash back",
  CRYPTO = "cryptocurrency",
  SAVINGS = "savings"
}

//Transaction Status Enum
export enum TransactionStatus {
  SUCCESSFUL = "successful",
  FAILED = "failed",
  PENDING = "pending",
  REVERSED = "reversed",
  DISPUTED = "disputed"
}

//Currencies
export enum CurrencyNames {
  AUD = "Australian Dollar",
  BGN = "Bulgarian Lev",
  BRL = "Brazilian Real",
  CAD = "Canadian Dollar",
  CHF = "Swiss Franc",
  CNY = "Chinese Yuan",
  CZK = "Czech Koruna",
  DKK = "Danish Krone",
  EUR = "Euro",
  GBP = "British Pound Sterling",
  HKD = "Hong Kong Dollar",
  HRK = "Croatian Kuna",
  HUF = "Hungarian Forint",
  IDR = "Indonesian Rupiah",
  ILS = "Israeli New Shekel",
  INR = "Indian Rupee",
  ISK = "Icelandic Króna",
  JPY = "Japanese Yen",
  KRW = "South Korean Won",
  MXN = "Mexican Peso",
  MYR = "Malaysian Ringgit",
  NOK = "Norwegian Krone",
  NZD = "New Zealand Dollar",
  PHP = "Philippine Peso",
  PLN = "Polish Zloty",
  RON = "Romanian Leu",
  RUB = "Russian Ruble",
  SEK = "Swedish Krona",
  SGD = "Singapore Dollar",
  THB = "Thai Baht",
  TRY = "Turkish Lira",
  USD = "United States Dollar",
  ZAR = "South African Rand",
}


export const currencyData: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr' },
];