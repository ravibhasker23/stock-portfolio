import { TotalPipe } from './total.pipe';
import { IStock } from '../store/stock-state.model';

describe('TotalPipe', () => {
  let pipe: TotalPipe;

  beforeEach(() => {
    pipe = new TotalPipe();
  });

  it('should calculate the total of a numeric field', () => {
    const stocks: IStock[] = [
      { symbol: 'AAPL.Q', name: 'Apple', price: 150 },
      { symbol: 'AMZN.Q', name: 'Amazon', price: 100 },
      { symbol: 'MSFT.Q', name: 'Microsoft', price: 200 },
    ];

    const total = pipe.transform(stocks, 'price');
    expect(total).toBe(450);
  });

  it('should return 0 if the stocks array is empty', () => {
    const stocks: IStock[] = [];
    const total = pipe.transform(stocks, 'price');
    expect(total).toBe(0);
  });

  it('should handle non-numeric fields gracefully', () => {
    const stocks: IStock[] = [
      { symbol: 'AAPL.Q', name: 'Apple', price: 150 },
      { symbol: 'AMZN.Q', name: 'Amazon', price: 100 },
      { symbol: 'MSFT.Q', name: 'Microsoft', price: 200 },
    ];

    const total = pipe.transform(stocks, 'name' as keyof IStock);
    expect(total).toBeNaN();
  });
});
