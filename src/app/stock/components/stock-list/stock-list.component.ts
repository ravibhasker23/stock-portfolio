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
    //initializaing the form group
    this.stockForm = this.fb.group({
      vwdKey: ['', Validators.required],
      numberOfContracts: [null, [Validators.required, Validators.min(1)]],
      buyValue: [null, [Validators.required, Validators.min(0)]],
    });
  }

  //add stock fetches the form values and dispatches an action to add the stock.
  //Based on the symbol/vwdKey the normalizing to EUR is calculated in the effects.
  //Also checks for existing stock value and updates the stocks array if exists
  addStock(): void {
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

  //Remove stock dispatches an action to remove the stock based on the symbol and update the stocks
  removeStock(symbol: string) {
    this.store.dispatch(new RemoveStock(symbol));
  }

  //Selected value to be displayed in the dropdown.
  onSelectStock(stock: Stock) {
    this.stockForm.controls['vwdKey'].setValue(stock.symbol);
    this.selectedStockSymbol = `${stock.symbol}`;
  }
}
