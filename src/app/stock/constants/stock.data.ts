// This file defines two arrays of stock objects: NL_STOCKS and US_STOCKS.
// Each array contains a list of stocks with their respective symbols and names.

import { Stock } from '../store/stock-state.model';

export const NL_STOCKS: Stock[] = [
  { symbol: 'AEX.NL', name: 'AEX Index' },
  { symbol: 'AALB.NL', name: 'Aalberts' },
  { symbol: 'ABN.NL', name: 'ABN AMRO Bank' },
  { symbol: 'ADYEN.NL', name: 'Adyen' },
  { symbol: 'AGN.NL', name: 'Aegon' },
  { symbol: 'AD.NL', name: 'Ahold Delhaize' },
  { symbol: 'AKZA.NL', name: 'Akzo Nobel' },
  { symbol: 'ASML.NL', name: 'ASML' },
  { symbol: 'ASRNL.NL', name: 'ASR Nederland' },
  { symbol: 'DSM.NL', name: 'DSM' },
  { symbol: 'HEIA.NL', name: 'Heineken' },
  { symbol: 'INGA.NL', name: 'ING' },
  { symbol: 'KPN.NL', name: 'KPN' },
];

export const US_STOCKS: Stock[] = [
  { symbol: 'AAPL.Q', name: 'Apple' },
  { symbol: 'AMZN.Q', name: 'Amazon' },
  { symbol: 'FB.Q', name: 'Facebook' },
  { symbol: 'MSFT.Q', name: 'Microsoft' },
];
