// src/lib/currencyConfig.ts
export const CURRENCIES = {
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    countryCodes: ['IN'],
    decimalPlaces: 2,
    format: (amount: number) => `₹${amount.toLocaleString('en-IN')}`
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    countryCodes: ['US'],
    decimalPlaces: 2,
    format: (amount: number) => `$${amount.toLocaleString('en-US')}`
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    countryCodes: ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'FI', 'GR', 'PT'],
    decimalPlaces: 2,
    format: (amount: number) => `€${amount.toLocaleString('en-EU')}`
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    countryCodes: ['GB'],
    decimalPlaces: 2,
    format: (amount: number) => `£${amount.toLocaleString('en-GB')}`
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    countryCodes: ['AE'],
    decimalPlaces: 2,
    format: (amount: number) => `د.إ${amount.toLocaleString('en-AE')}`
  },
  SAR: {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'ر.س',
    countryCodes: ['SA'],
    decimalPlaces: 2,
    format: (amount: number) => `ر.س${amount.toLocaleString('en-SA')}`
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    countryCodes: ['CA'],
    decimalPlaces: 2,
    format: (amount: number) => `CA$${amount.toLocaleString('en-CA')}`
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    countryCodes: ['AU'],
    decimalPlaces: 2,
    format: (amount: number) => `A$${amount.toLocaleString('en-AU')}`
  }
};

export const COUNTRIES = [
  { code: 'IN', name: 'India', currency: 'INR', phoneCode: '+91' },
  { code: 'US', name: 'United States', currency: 'USD', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', phoneCode: '+44' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', phoneCode: '+966' },
  { code: 'CA', name: 'Canada', currency: 'CAD', phoneCode: '+1' },
  { code: 'AU', name: 'Australia', currency: 'AUD', phoneCode: '+61' },
  { code: 'DE', name: 'Germany', currency: 'EUR', phoneCode: '+49' },
  { code: 'FR', name: 'France', currency: 'EUR', phoneCode: '+33' },
  { code: 'IT', name: 'Italy', currency: 'EUR', phoneCode: '+39' },
  { code: 'ES', name: 'Spain', currency: 'EUR', phoneCode: '+34' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', phoneCode: '+31' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', phoneCode: '+65' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', phoneCode: '+60' },
  { code: 'JP', name: 'Japan', currency: 'JPY', phoneCode: '+81' },
  { code: 'CN', name: 'China', currency: 'CNY', phoneCode: '+86' },
];

// Default exchange rates (should be updated regularly via API)
export const DEFAULT_EXCHANGE_RATES = {
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
  CNY: 0.087
};