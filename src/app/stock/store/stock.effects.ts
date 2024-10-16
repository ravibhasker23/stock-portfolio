import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ActionTypes, AddStockError, AddStockSuccess } from './stock.actions';
import { Action } from '@ngrx/store';
import { StockService } from '../services/stock.service';
import { IAddStock, IStock } from './stock-state.model';

@Injectable()
export class StockEffects {
  constructor(
    private actions$: Actions<Action>,
    private _stockService: StockService,
  ) {}

  //Fetching the stock details.
  //Checks for vwdKey if it is US or NL stock. If it is a US stock it calls the exhange rate service to fetch the price and fetches the stock details.
  //Updates the current price calculated using normaliseToEur method.
  //If it is a NL stock it will fetch the stock details only from the endpoint.
  public addStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.ADD_STOCKS),
      //handle the action and perform the async operations
      switchMap((action: { payload: IAddStock }) => {
        const symbol = action.payload.vwdKey;
        //check if US or NL stock
        if (symbol.endsWith('.Q')) {
          //to make paralled API calls to get stock data and exchange rate
          return forkJoin({
            stocks: this._stockService.getStocksBySymbol(symbol),
            rate: this._stockService.getExchangeRate(),
          }).pipe(
            map(({ stocks, rate }) => {
              const convertedPrice = this._stockService.normaliseToEur(
                stocks[0].price,
                rate[0].price,
              );

              const updatedStock: IStock = {
                ...stocks[0],
                price: Number(convertedPrice.toFixed(2)),
                numberOfContracts: Number(action.payload.numberOfContracts),
                buyValue:
                  Number(action.payload.buyValue) *
                  action.payload.numberOfContracts,
                currentValue: convertedPrice * action.payload.numberOfContracts,
                //Yield calculated using the formula (current price - buy price)/ buy price * 100
                yield:
                  ((convertedPrice - Number(action.payload.buyValue)) /
                    Number(action.payload.buyValue)) *
                  100,
              };
              return new AddStockSuccess({ stock: updatedStock });
            }),
            //error handling
            catchError(() =>
              of(
                new AddStockError({
                  errorCode: 1,
                  errorMsg: 'Unable to add the stock to the portfolio',
                }),
              ),
            ),
          );
        } else {
          const symbol = action.payload.vwdKey;
          //fetches only the stock data
          return this._stockService.getStocksBySymbol(symbol).pipe(
            map((response) => {
              const updatedStock: IStock = {
                ...response[0],
                numberOfContracts: Number(action.payload.numberOfContracts),
                buyValue:
                  Number(action.payload.buyValue) *
                  action.payload.numberOfContracts,
                currentValue:
                  response[0].price * action.payload.numberOfContracts,
                //Yield Calculated using the formula (current price - buy price)/ buy price * 100
                yield:
                  ((response[0].price - Number(action.payload.buyValue)) /
                    Number(action.payload.buyValue)) *
                  100,
              };
              return new AddStockSuccess({ stock: updatedStock });
            }),
            //error handling
            catchError(() =>
              of(
                new AddStockError({
                  errorCode: 1,
                  errorMsg: 'Unable to add the stock to the portfolio',
                }),
              ),
            ),
          );
        }
      }),
    ),
  );
}
