export type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "SAR"
  | "CAD"
  | "AUD"
  | "SGD"
  | "MYR"
  | "JPY"
  | "CNY";

type CurrencyConfig = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  countryCodes: string[];
  locale: string;
  decimalPlaces: number;
  format: (amount: number) => string;
};

function createCurrency(config: Omit<CurrencyConfig, "format">): CurrencyConfig {
  return {
    ...config,
    format: (amount: number) => `${config.symbol}${amount.toLocaleString(config.locale)}`,
  };
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: createCurrency({
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    countryCodes: ["IN"],
    locale: "en-IN",
    decimalPlaces: 2,
  }),
  USD: createCurrency({
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    countryCodes: ["US"],
    locale: "en-US",
    decimalPlaces: 2,
  }),
  EUR: createCurrency({
    code: "EUR",
    name: "Euro",
    symbol: "€",
    countryCodes: ["DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "FI", "GR", "PT"],
    locale: "de-DE",
    decimalPlaces: 2,
  }),
  GBP: createCurrency({
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    countryCodes: ["GB"],
    locale: "en-GB",
    decimalPlaces: 2,
  }),
  AED: createCurrency({
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
    countryCodes: ["AE"],
    locale: "ar-AE",
    decimalPlaces: 2,
  }),
  SAR: createCurrency({
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "ر.س",
    countryCodes: ["SA"],
    locale: "ar-SA",
    decimalPlaces: 2,
  }),
  CAD: createCurrency({
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "CA$",
    countryCodes: ["CA"],
    locale: "en-CA",
    decimalPlaces: 2,
  }),
  AUD: createCurrency({
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    countryCodes: ["AU"],
    locale: "en-AU",
    decimalPlaces: 2,
  }),
  SGD: createCurrency({
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    countryCodes: ["SG"],
    locale: "en-SG",
    decimalPlaces: 2,
  }),
  MYR: createCurrency({
    code: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM",
    countryCodes: ["MY"],
    locale: "ms-MY",
    decimalPlaces: 2,
  }),
  JPY: createCurrency({
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    countryCodes: ["JP"],
    locale: "ja-JP",
    decimalPlaces: 0,
  }),
  CNY: createCurrency({
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    countryCodes: ["CN"],
    locale: "zh-CN",
    decimalPlaces: 2,
  }),
};

export const COUNTRIES = [
  { code: "IN", name: "India", currency: "INR", phoneCode: "+91" },
  { code: "US", name: "United States", currency: "USD", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", currency: "GBP", phoneCode: "+44" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", phoneCode: "+971" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", phoneCode: "+966" },
  { code: "CA", name: "Canada", currency: "CAD", phoneCode: "+1" },
  { code: "AU", name: "Australia", currency: "AUD", phoneCode: "+61" },
  { code: "DE", name: "Germany", currency: "EUR", phoneCode: "+49" },
  { code: "FR", name: "France", currency: "EUR", phoneCode: "+33" },
  { code: "IT", name: "Italy", currency: "EUR", phoneCode: "+39" },
  { code: "ES", name: "Spain", currency: "EUR", phoneCode: "+34" },
  { code: "NL", name: "Netherlands", currency: "EUR", phoneCode: "+31" },
  { code: "SG", name: "Singapore", currency: "SGD", phoneCode: "+65" },
  { code: "MY", name: "Malaysia", currency: "MYR", phoneCode: "+60" },
  { code: "JP", name: "Japan", currency: "JPY", phoneCode: "+81" },
  { code: "CN", name: "China", currency: "CNY", phoneCode: "+86" },
] as const;

export const DEFAULT_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  SAR: 0.045,
  CAD: 0.016,
  AUD: 0.018,
  SGD: 0.016,
  MYR: 0.057,
  JPY: 1.78,
  CNY: 0.087,
};
