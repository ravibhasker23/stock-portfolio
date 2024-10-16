import { ActionTypes } from './stock.actions';
import { IAction, IStockState } from './stock-state.model';

//Initial state of the stock reducer
export const initState: IStockState = {
  loading: false,
  error: null,
  stocks: [],
};

export function StockReducer(state = initState, action: IAction): IStockState {
  switch (action.type) {
    case ActionTypes.ADD_STOCKS: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ActionTypes.ADD_STOCKS_SUCCESS: {
      //check if stock already exists in the stocks array using the vwdKey
      const existingStockIdx = state.stocks.findIndex(
        (s) => s.vwdKey === action.payload.stock.vwdKey,
      );

      if (existingStockIdx !== -1) {
        const existingStock = state.stocks[existingStockIdx];
        const totalContracts =
          existingStock.numberOfContracts +
          action.payload.stock.numberOfContracts;
        const totalBuyValue =
          existingStock.buyValue * existingStock.numberOfContracts +
          action.payload.stock.buyValue *
            action.payload.stock.numberOfContracts;
        const avgBuyValue = totalBuyValue / totalContracts;
        const currentValue = existingStock.price * totalContracts;
        const yieldValue =
          ((currentValue - totalBuyValue) / totalBuyValue) * 100;

        const updatedStock = {
          ...existingStock,
          numberOfContracts: totalContracts,
          buyValue: avgBuyValue,
          currentValue: currentValue,
          yield: yieldValue,
        };

        //if exists updates the existing stock with the new values
        const updatedStocks = [
          ...state.stocks.slice(0, existingStockIdx),
          updatedStock,
          ...state.stocks.slice(existingStockIdx + 1),
        ];

        return {
          ...state,
          loading: false,
          error: null,
          stocks: updatedStocks,
        };
      } else {
        //else adds a new stock in the stock array
        return {
          ...state,
          loading: false,
          error: null,
          stocks: [...state.stocks, action.payload.stock],
        };
      }
    }
    //Handling error and fetching the proper error message
    case ActionTypes.ADD_STOCKS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.errorMsg,
      };
    }
    //Removes the stock from the stocks array matches with vwdKey
    case ActionTypes.REMOVE_STOCK: {
      return {
        ...state,
        loading: false,
        stocks: state.stocks.filter((stock) => stock.vwdKey !== action.payload),
        error: null,
      };
    }
    default:
      return state;
  }
}
