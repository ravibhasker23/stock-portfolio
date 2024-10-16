import { TotalPipe } from './total.pipe';
import { IStock } from '../store/stock-state.model';

describe('TotalPipe', () => {
  let pipe: TotalPipe;

  beforeEach(() => {
    pipe = new TotalPipe();
  });

  it('should calculate the total of a numeric field', () => {
    const stocks: IStock[] = [
      {
        vwdKey: 'AAPL.Q',
        name: 'Apple',
        price: 150,
        currentPrice: 0,
        numberOfContracts: 0,
        buyValue: 0,
        currentValue: 0,
        yield: 0,
      },
      {
        vwdKey: 'AMZN.Q',
        name: 'Amazon',
        price: 100,
        currentPrice: 0,
        numberOfContracts: 0,
        buyValue: 0,
        currentValue: 0,
        yield: 0,
      },
      {
        vwdKey: 'MSFT.Q',
        name: 'Microsoft',
        price: 200,
        currentPrice: 0,
        numberOfContracts: 0,
        buyValue: 0,
        currentValue: 0,
        yield: 0,
      },
    ];

    const total = pipe.transform(stocks, 'price');
    expect(total).toBe(450);
  });

  it('should return 0 if the stocks array is empty', () => {
    const stocks: IStock[] = [];
    const total = pipe.transform(stocks, 'price');
    expect(total).toBe(0);
  });
});
