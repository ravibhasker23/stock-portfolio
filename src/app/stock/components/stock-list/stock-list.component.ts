import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStockSelectState } from '../../store/stock-state.model';
import { AddStock, errorSelector, loadingSelector, RemoveStock, stocksSelector } from '../../store';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {
  stockForm!: FormGroup;

  stocks$ = this.store.select(stocksSelector as any);

  error$ = this.store.select(errorSelector as any);

  loading$ = this.store.select(loadingSelector as any);
  
  constructor(private fb: FormBuilder, private store: Store<IStockSelectState>){

  }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      vwdKey: ['', Validators.required],
      numberOfContracts: [null, [Validators.required, Validators.min(1)]],
      buyValue: [null, [Validators.required,Validators.min(0)]],
    });
  }

  addStock(): void{
    console.log('add');
    if(this.stockForm.valid){
      const { vwdKey, numberOfContracts, buyValue } = this.stockForm.value;
      this.store.dispatch(new AddStock({ vwdKey, numberOfContracts, buyValue}))
      this.stockForm.reset();
    }
  }

  removeStock(symbol: string){
    this.store.dispatch(new RemoveStock(symbol));
  }
}
