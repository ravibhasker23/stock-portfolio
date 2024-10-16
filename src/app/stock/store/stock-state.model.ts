import { Action } from '@ngrx/store';

//overall state
export interface IStockSelectState {
  stock: IStockState;
}

//interface for add stock
export interface IAddStock {
  vwdKey: string;
  numberOfContracts: number;
  buyValue: number;
}

// interface for displaying the values in the table
export interface IStock {
  vwdKey: string;
  name: string;
  currentPrice: number;
  numberOfContracts: number;
  buyValue: number;
  currentValue: number;
  yield: number;
  price: number;
}

//initial state of the reducer
export interface IStockState {
  stocks: IStock[];
  error: string | null;
  loading: boolean;
}

//error handling interface
export interface IError {
  errorMsg: string;
  errorCode: number;
}

export interface IAction extends Action {
  payload?: any;
}

export interface Stock {
  symbol: string;
  name: string;
}
