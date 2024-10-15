import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import {
  ActionTypes,
  AddStockError,
  AddStockSuccess,
} from './stock.actions';
import { Action } from '@ngrx/store';
import { StockService } from '../services/stock.service';
import { IAddStock, IStock } from './stock-state.model';

@Injectable()
export class StockEffects {
  constructor(
    private actions$: Actions<Action>,
    private _stockService: StockService,
  ) {}

  // public addStocks$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ActionTypes.ADD_STOCKS),
  //     mergeMap((action: { payload: IStock}) => {
  //       const symbol = action.payload.vwdKey;
  //       const isUsdStock = symbol.endsWith('.Q');
  //       if(isUsdStock){
  //         return forkJoin({
  //           stocks: this._stockService.getStocksBySymbol(symbol),
  //           rate: this._stockService.getExchangeRate()
  //         }).pipe(
  //           map(({ stocks, rate }) =>{
  //             const updatedPrice = this._stockService.normaliseToEur(stocks[0].price, rate[0].price);

  //             const updatedStock: IStock = {
  //               ...stocks[0],
  //               price: updatedPrice,
  //               numberOfContracts: Number(action.payload.numberOfContracts),
  //               buyValue: Number(action.payload.buyValue) * action.payload.numberOfContracts,
  //               currentValue: updatedPrice * action.payload.numberOfContracts,
  //               yield: (updatedPrice - Number(action.payload.buyValue))/ Number(action.payload.buyValue) * 100
  //             };
  //             return new AddStockSuccess({stock: updatedStock});
  //           })
  //         );
  //       }else{
  //         return this._stockService.getStocksBySymbol(symbol).pipe(
  //           map((response) => {
  //             const updatedStock: IStock = {
  //               ...response[0],
  //               numberOfContracts: Number(action.payload.numberOfContracts),
  //               buyValue: Number(action.payload.buyValue) * action.payload.numberOfContracts,
  //               currentValue: response[0].price * action.payload.numberOfContracts,
  //               yield: (response[0].price - Number(action.payload.buyValue))/ Number(action.payload.buyValue) * 100
  //             }
  //             return new AddStockSuccess({stock: updatedStock});
  //           }),
  //           catchError((error) => of(new AddStockError(error))),
  //         );
  //       }

  //     }),
  //   );
  // });


  public addStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.ADD_STOCKS),
      switchMap((action: { payload: IAddStock}) => {
        const symbol = action.payload.vwdKey;
        if(symbol.endsWith('.Q')){
          return forkJoin({
            stocks: this._stockService.getStocksBySymbol(symbol),
            rate: this._stockService.getExchangeRate()
          }).pipe(
            map(( {stocks, rate}) => {
              const convertedPrice = this._stockService.normaliseToEur(stocks[0].price, rate[0].price);

              const updatedStock: IStock = {
                ...stocks[0],
                price: Number(convertedPrice.toFixed(2)),
                numberOfContracts: Number(action.payload.numberOfContracts),
                buyValue: Number(action.payload.buyValue) * action.payload.numberOfContracts,
                currentValue: convertedPrice * action.payload.numberOfContracts,
                yield: (convertedPrice - Number(action.payload.buyValue))/ Number(action.payload.buyValue) * 100
              };
              return new AddStockSuccess({stock: updatedStock});
            })
          )
        }else{
        const symbol = action.payload.vwdKey;
        return this._stockService.getStocksBySymbol(symbol).pipe(
            map((response) => {
              const updatedStock: IStock = {
                ...response[0],
                numberOfContracts: Number(action.payload.numberOfContracts),
                buyValue: Number(action.payload.buyValue) * action.payload.numberOfContracts,
                currentValue: response[0].price * action.payload.numberOfContracts,
                yield: (response[0].price - Number(action.payload.buyValue))/ Number(action.payload.buyValue) * 100
              }
              return new AddStockSuccess({stock: updatedStock});
            }),
            catchError((error) => of(new AddStockError(error))),
        )}
      })
    )
  )

  }