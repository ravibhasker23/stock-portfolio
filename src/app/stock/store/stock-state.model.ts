import { Action } from '@ngrx/store';

export interface IStockSelectState{
  stock: IStockState;
}

export interface IAddStock{
  vwdKey: string;
  numberOfContracts: number;
  buyValue: number;
}

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

export interface IStockState{
  stocks: IStock[];
  error: null;
  loading: boolean;
}

//error handling interface
export interface IError {
  errorMsg: string;
  errorCode: string;
}

export interface IAction extends Action {
  payload?: any;
}

export interface Stock {
  symbol: string;
  name: string;
}

// stock-data.ts
import { Stock } from './stock.model';

export const NL_STOCKS: Stock[] = [
  { symbol: 'AEX.NL', name: 'AEX Index' },
  { symbol: 'AALB.NL', name: 'Aalberts' },
  { symbol: 'ABN.NL', name: 'ABN AMRO Bank' },
  { symbol: 'ADYEN.NL', name: 'Adyen' },
  { symbol: 'AGN.NL', name: 'Aegon' },
  { symbol: 'AD.NL', name: 'Ahold Delhaize' },
  { symbol: 'AKZA.NL', name: 'Akzo Nobel' },
  { symbol: 'MT.NL', name: 'ArcelorMittal' },
  { symbol: 'ASML.NL', name: 'ASML' },
  { symbol: 'ASRNL.NL', name: 'ASR Nederland' },
  { symbol: 'DSM.NL', name: 'DSM' },
  { symbol: 'GLPG.NL', name: 'Galapagos' },
  { symbol: 'HEIA.NL', name: 'Heineken' },
  { symbol: 'IMCD.NL', name: 'IMCD' },
  { symbol: 'INGA.NL', name: 'ING' },
  { symbol: 'KPN.NL', name: 'KPN' },
  { symbol: 'NN.NL', name: 'NN Group' },
  { symbol: 'PHIA.NL', name: 'Philips Koninklijke' },
  { symbol: 'RAND.NL', name: 'Randstad' },
  { symbol: 'REN.NL', name: 'RELX' },
  { symbol: 'RDSA.NL', name: 'Royal Dutch Shell A' },
  { symbol: 'TKWY.NL', name: 'Takeaway.com' },
  { symbol: 'URW.NL', name: 'Unibail-Rodamco-Westfield' },
  { symbol: 'UNA.NL', name: 'Unilever' },
  { symbol: 'VPK.NL', name: 'Vopak' },
  { symbol: 'WKL.NL', name: 'Wolters Kluwer' }
];

export const US_STOCKS: Stock[] = [
  { symbol: 'AAPL.Q', name: 'Apple' },
  { symbol: 'AMZN.Q', name: 'Amazon' },
  { symbol: 'FB.Q', name: 'Facebook' },
  { symbol: 'MSFT.Q', name: 'Microsoft' }
];
