import currency from 'currency.js';

export interface ICost {
  sumDays: number;
  daysOfStay: number;
  hours: number;
  minutes: number;
}

export interface CurrencyOperations {
  create(value: number): any;
  add(a: currency, b: number): any;
  subtract(a: currency, b: number): any;
  multiply(a: currency, b: number): any;
  divide(a: currency, b: number): any;
  format(value: currency, options?: any): string;
}
export interface TotalCalculator {
  taxes: number;
  unitPriceWithTaxes: number;
  unitPriceWithoutTaxes: number;
  subtotal: number;
  taxedAmount: number;
  total: number;
}
