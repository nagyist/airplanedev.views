import getSymbolFromCurrency from "currency-symbol-map";

const REVERSED_CURRENCIES = ["ARS", "BRL", "CHF", "DKK", "EUR", "ILS", "PLN"];

export const currencyParser = (currency?: string) => (value?: string) => {
  const c = currency ?? "USD";
  if (REVERSED_CURRENCIES.includes(c)) {
    return value?.replace(/[^0-9,]/g, "").replace(/,/, ".");
  }
  return value?.replace(/[^0-9.]/g, "");
};

const currencyFormatterStandard = (currency: string) => (value?: string) => {
  const parts = value?.split(".");
  const symbol = getSymbolFromCurrency(currency);
  if (!parts?.length) {
    return "";
  }
  // Add commas for every 3 digits before the decimal
  const left = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.length > 1
    ? `${symbol} ${left}.${parts.slice(1).join("")}`
    : `${symbol} ${left}`;
};

const currencyFormatterReversed = (currency: string) => (value?: string) => {
  const parts = value?.split(".");
  const symbol = getSymbolFromCurrency(currency);
  if (!parts?.length) {
    return "";
  }
  // Add periods for every 3 digits before the decimal
  const left = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.length > 1
    ? `${symbol} ${left},${parts.slice(1).join("")}`
    : `${symbol} ${left}`;
};

export const currencyFormatter = (currency?: string) => {
  const c = currency ?? "USD";
  if (REVERSED_CURRENCIES.includes(c)) {
    return currencyFormatterReversed(c);
  }
  return currencyFormatterStandard(c);
};

export const percentParser = (value?: string) => {
  const percent = value?.replace("%", "") ?? "";
  const parts = percent.split(".");
  if (!parts.length) {
    return "";
  }
  // Shift decimal 2 places to the left to get value
  const padded = parts[0].padStart(2, "0");
  return `${padded.slice(0, -2)}.${padded.slice(-2)}${parts.slice(1).join("")}`;
};

export const percentFormatter = (value?: string) => {
  const parts = value?.split(".");
  if (!parts?.length) {
    return "";
  }
  // Shift decimal 2 places to the right
  const padded = parts.slice(1).join("").padEnd(2, "0");
  const output = `${parts[0]}${padded.slice(0, 2)}.${padded.slice(2)}`;
  // Remove unnecessary leading 0s and trailing period
  return `${output
    .replace(/^0+/, "")
    .replace(/^\./, "0.")
    .replace(/\.$/, "")}%`;
};
