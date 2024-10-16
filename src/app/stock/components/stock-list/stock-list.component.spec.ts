import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { StockListComponent } from './stock-list.component';
import { IStockSelectState, Stock } from '../../store/stock-state.model';
import { AddStock, RemoveStock, StockReducer } from '../../store';
import { NL_STOCKS, US_STOCKS } from '../../constants/stock.data';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let store: Store<IStockSelectState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockListComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({ stock: StockReducer }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.stockForm).toBeDefined();
    expect(component.stockForm.controls['vwdKey']).toBeDefined();
    expect(component.stockForm.controls['numberOfContracts']).toBeDefined();
    expect(component.stockForm.controls['buyValue']).toBeDefined();
  });

  it('should dispatch AddStock action when form is valid and addStock is called', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    component.stockForm.setValue({
      vwdKey: 'AAPL',
      numberOfContracts: 10,
      buyValue: 150,
    });

    component.addStock();

    expect(store.dispatch).toHaveBeenCalledWith(
      new AddStock({ vwdKey: 'AAPL', numberOfContracts: 10, buyValue: 150 }),
    );
    expect(component.stockForm.valid).toBeFalsy();
  });

  it('should not dispatch AddStock action when form is invalid and addStock is called', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    component.stockForm.setValue({
      vwdKey: '',
      numberOfContracts: null,
      buyValue: null,
    });

    component.addStock();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.stockForm.valid).toBeFalsy();
  });

  it('should dispatch RemoveStock action when removeStock is called', () => {
    spyOn(store, 'dispatch');
    const symbol = 'AAPL';

    component.removeStock(symbol);

    expect(store.dispatch).toHaveBeenCalledWith(new RemoveStock(symbol));
  });

  it('should set selectedStockSymbol and form control value when onSelectStock is called', () => {
    const stock: Stock = { symbol: 'AAPL', name: 'APPLE' };

    component.onSelectStock(stock);

    expect(component.selectedStockSymbol).toBe('AAPL');
    expect(component.stockForm.controls['vwdKey'].value).toBe('AAPL');
  });
});
