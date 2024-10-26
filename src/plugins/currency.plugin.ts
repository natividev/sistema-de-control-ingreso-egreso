import * as currency from 'currency.js';
import { CurrencyOperations } from './interface';

class CurrencyAdapter implements CurrencyOperations {
  private static instance: CurrencyAdapter;

  public static getInstance(): CurrencyAdapter {
    if (!CurrencyAdapter.instance) {
      CurrencyAdapter.instance = new CurrencyAdapter();
    }
    return CurrencyAdapter.instance;
  }

  create(
    value: number,
    options: currency.Options = { precision: 2 },
  ): currency {
    return currency(value, options);
  }

  add(value: currency, amount: number): currency {
    return value.add(amount);
  }

  subtract(value: currency, amount: number): currency {
    return value.subtract(amount);
  }

  multiply(value: currency, amount: number): currency {
    return value.multiply(amount);
  }

  divide(value: currency, amount: number): currency {
    return value.divide(amount);
  }

  format(
    value: currency,
    options: currency.Options = { precision: 2 },
  ): string {
    return value.format(options);
  }
}

export const currencyAdapter = CurrencyAdapter.getInstance();
