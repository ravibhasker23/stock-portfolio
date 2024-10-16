import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { StockEffects } from './stock.effects';
import { StockService } from '../services/stock.service';
import { ActionTypes, AddStockSuccess, AddStockError } from './stock.actions';
import { Action } from '@ngrx/store';
import { IStock } from './stock-state.model';

describe('StockEffects', () => {
  let actions$: Observable<Action>;
  let effects: StockEffects;
  let stockService: jasmine.SpyObj<StockService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StockService', ['getStocksBySymbol', 'getExchangeRate', 'normaliseToEur']);

    TestBed.configureTestingModule({
      providers: [
        StockEffects,
        provideMockActions(() => actions$),
        { provide: StockService, useValue: spy },
      ],
    });

    effects = TestBed.inject(StockEffects);
    stockService = TestBed.inject(StockService) as jasmine.SpyObj<StockService>;
  });

  it('should return AddStockSuccess when adding stocks with .Q symbol', (done) => {
    const action = { type: ActionTypes.ADD_STOCKS, payload: { vwdKey: 'AAPL.Q', numberOfContracts: 10, buyValue: 100 } };
    const stocksResponse = [{ price: 150 }];
    const rateResponse = [{ price: 1.1 }];
    const convertedPrice = 136.36; // 150 / 1.1

    actions$ = of(action);
    stockService.getStocksBySymbol.and.returnValue(of(stocksResponse));
    stockService.getExchangeRate.and.returnValue(of(rateResponse));
    stockService.normaliseToEur.and.returnValue(convertedPrice);

    const expectedStock: IStock = {
      vwdKey: 'AAPL.Q',
      name: 'Apple Inc.',
      price: 150,
      numberOfContracts: 10,
      buyValue: 1000,
      currentValue: 1363.6,
      yield: 36.36,
    };

    effects.addStocks$.subscribe(result => {
      expect(result).toEqual(new AddStockSuccess({ stock: expectedStock }));
      done();
    });
  });

  it('should return AddStockError when adding stocks with .Q symbol fails', (done) => {
    const action = { type: ActionTypes.ADD_STOCKS, payload: { vwdKey: 'AAPL.Q', numberOfContracts: 10, buyValue: 100 } };

    actions$ = of(action);
    stockService.getStocksBySymbol.and.returnValue(throwError('error'));
    stockService.getExchangeRate.and.returnValue(of([{ price: 1.1 }]));

    effects.addStocks$.subscribe(result => {
      expect(result).toEqual(new AddStockError({ errorCode: 1, errorMsg: 'Unable to add the stock to the portfolio' }));
      done();
    });
  });

  it('should return AddStockSuccess when adding stocks without .Q symbol', (done) => {
    const action = { type: ActionTypes.ADD_STOCKS, payload: { vwdKey: 'AAPL', numberOfContracts: 10, buyValue: 100 } };
    const stocksResponse = [{ price: 150 }];

    actions$ = of(action);
    stockService.getStocksBySymbol.and.returnValue(of(stocksResponse));

    const expectedStock: IStock = {
      vwdKey: 'AAPL',
      name: 'Apple Inc.',
      price: 150,
      numberOfContracts: 10,
      buyValue: 1000,
      currentValue: 1500,
      yield: 50,
    };

    effects.addStocks$.subscribe(result => {
      expect(result).toEqual(new AddStockSuccess({ stock: expectedStock }));
      done();
    });
  });

  it('should return AddStockError when adding stocks without .Q symbol fails', (done) => {
    const action = { type: ActionTypes.ADD_STOCKS, payload: { vwdKey: 'AAPL', numberOfContracts: 10, buyValue: 100 } };

    actions$ = of(action);
    stockService.getStocksBySymbol.and.returnValue(throwError('error'));

    effects.addStocks$.subscribe(result => {
      expect(result).toEqual(new AddStockError({ errorCode: 1, errorMsg: 'Unable to add the stock to the portfolio' }));
      done();
    });
  });
});
