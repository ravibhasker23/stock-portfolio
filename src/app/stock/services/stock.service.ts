import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IStock } from '../store/stock-state.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stockEndpoint =
    'https://test.solutions.vwdservices.com/internal/intake-test/sample-data/price-data?vwdkey=';
  private exchangeRateEndpoint =
    'https://test.solutions.vwdservices.com/internal/intake-test/sample-data/price-data?vwdkey=USDEUR.FXVWD';

  constructor(private http: HttpClient) {}

  //fetches the data for stocks based on symbol
  getStocksBySymbol(symbol: string): Observable<IStock[]> {
    return this.http.get<IStock[]>(this.stockEndpoint + symbol).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  //fetches the data for stocks based on exhange rate
  getExchangeRate(): Observable<any[]> {
    return this.http.get<any[]>(this.exchangeRateEndpoint).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  //USD to EUR conversion
  normaliseToEur(amount: number, rate: number): number {
    return amount * rate;
  }
}
