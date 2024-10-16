import { IAddStock, IError, IStock } from './stock-state.model';
import * as stockActions from './stock.actions';

describe('AddStock', () => {
  it('should add the stocks', () => {
    const payload: IAddStock = {
      vwdKey: '',
      numberOfContracts: 0,
      buyValue: 0,
    };
    const action = new stockActions.AddStock(payload);
    expect(action.type).toBe(stockActions.ActionTypes.ADD_STOCKS);
  });
});

describe('AddStockSuccess', () => {
  it('should call success when effect is complete', () => {
    const payload = {
      stock: {
        vwdKey: '',
        name: '',
        currentPrice: 0,
        numberOfContracts: 0,
        buyValue: 0,
        currentValue: 0,
        yield: 0,
        price: 0,
      },
    };
    const action = new stockActions.AddStockSuccess(payload);
    expect(action.type).toBe(
      stockActions.ActionTypes.ADD_STOCKS_SUCCESS,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('AddStockError', () => {
  it('should call error when effect has error', () => {
    const payload: IError = {
      errorMsg: '',
      errorCode: 0,
    };
    const action = new stockActions.AddStockError(payload);
    expect(action.type).toBe(
      stockActions.ActionTypes.ADD_STOCKS_ERROR,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('RemoveStock', () => {
  it('should call RemoveStock for storing user inputs', () => {
    const payload: string = '';
    const action = new stockActions.RemoveStock(payload);
    expect(action.type).toBe(stockActions.ActionTypes.REMOVE_STOCK, payload);

    expect(action.payload).toEqual(payload);
  });
});
