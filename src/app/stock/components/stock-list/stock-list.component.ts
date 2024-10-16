import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStockSelectState, Stock } from '../../store/stock-state.model';
import {
  AddStock,
  errorSelector,
  loadingSelector,
  RemoveStock,
  stocksSelector,
} from '../../store';
import { NL_STOCKS, US_STOCKS } from '../../constants/stock.data';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
})
export class StockListComponent implements OnInit {
  stockForm!: FormGroup;

  stocks$ = this.store.select(stocksSelector as any);

  error$ = this.store.select(errorSelector as any);

  loading$ = this.store.select(loadingSelector as any);

  nlStocks: Stock[] = NL_STOCKS;
  usStocks: Stock[] = US_STOCKS;

  selectedStockSymbol: string = '';
  constructor(
    private fb: FormBuilder,
    private store: Store<IStockSelectState>,
  ) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      vwdKey: ['', Validators.required],
      numberOfContracts: [null, [Validators.required, Validators.min(1)]],
      buyValue: [null, [Validators.required, Validators.min(0)]],
    });
  }

  addStock(): void {
    console.log('add');
    if (this.stockForm.valid) {
      const { vwdKey, numberOfContracts, buyValue } = this.stockForm.value;
      this.store.dispatch(
        new AddStock({ vwdKey, numberOfContracts, buyValue }),
      );
      this.stockForm.reset();
      this.selectedStockSymbol = '';
    } else {
      this.stockForm.controls['vwdKey'].markAsTouched();
      this.stockForm.controls['numberOfContracts'].markAsTouched();
      this.stockForm.controls['buyValue'].markAsTouched();
    }
  }

  removeStock(symbol: string) {
    this.store.dispatch(new RemoveStock(symbol));
  }

  onSelectStock(stock: Stock) {
    this.stockForm.controls['vwdKey'].setValue(stock.symbol);
    this.selectedStockSymbol = `${stock.symbol}`;
  }
}
