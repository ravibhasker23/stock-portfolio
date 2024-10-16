import { Pipe, PipeTransform } from '@angular/core';
import { IStock } from '../store/stock-state.model';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(stocks: IStock[], field: keyof IStock): number {
    return stocks.reduce((total, stock) => total + (stock[field] as number), 0);
  }
}
