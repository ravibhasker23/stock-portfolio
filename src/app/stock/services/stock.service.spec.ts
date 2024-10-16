import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from './stock.service';
import { IStock } from '../store/stock-state.model';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService],
    });
    service = TestBed.inject(StockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stocks by symbol', () => {
    const dummyStocks: IStock[] = [
      { symbol: 'AAPL', price: 150 },
      { symbol: 'GOOGL', price: 2800 },
    ];

    service.getStocksBySymbol('AAPL').subscribe((stocks) => {
      expect(stocks.length).toBe(2);
      expect(stocks).toEqual(dummyStocks);
    });

    const req = httpMock.expectOne(`${service['stockEndpoint']}AAPL`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStocks);
  });

  it('should fetch exchange rate', () => {
    const dummyRate = [{ rate: 0.85 }];

    service.getExchangeRate().subscribe((rate) => {
      expect(rate.length).toBe(1);
      expect(rate).toEqual(dummyRate);
    });

    const req = httpMock.expectOne(service['exchangeRateEndpoint']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRate);
  });

  it('should normalize amount to EUR', () => {
    const amount = 100;
    const rate = 0.85;
    const expected = 85;

    const result = service.normaliseToEur(amount, rate);
    expect(result).toBe(expected);
  });

  it('should handle error on getStocksBySymbol', () => {
    const errorMessage = '404 error';

    service.getStocksBySymbol('AAPL').subscribe(
      () => fail('expected an error, not stocks'),
      (error) => expect(error.message).toContain(errorMessage)
    );

    const req = httpMock.expectOne(`${service['stockEndpoint']}AAPL`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should handle error on getExchangeRate', () => {
    const errorMessage = '404 error';

    service.getExchangeRate().subscribe(
      () => fail('expected an error, not exchange rate'),
      (error) => expect(error.message).toContain(errorMessage)
    );

    const req = httpMock.expectOne(service['exchangeRateEndpoint']);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
