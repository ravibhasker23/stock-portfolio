import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
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

  getStocksBySymbol(symbol: string): Observable<IStock[]> {
    return this.http.get<IStock[]>(this.stockEndpoint + symbol).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  getExchangeRate(): Observable<any[]> {
    return this.http.get<any[]>(this.exchangeRateEndpoint).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  normaliseToEur(amount: number, rate: number): number {
    return amount * rate;
  }
}
