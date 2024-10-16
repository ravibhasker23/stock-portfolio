// This file defines an Angular pipe named 'total'.
// The pipe is used to calculate the total value of a specific field for an array of stock objects.

import { Pipe, PipeTransform } from '@angular/core';
import { IStock } from '../store/stock-state.model';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  // The transform method takes an array of stocks and a field name
  transform(stocks: IStock[], field: keyof IStock): number {
    return stocks.reduce((total, stock) => total + (stock[field] as number), 0);
  }
}
