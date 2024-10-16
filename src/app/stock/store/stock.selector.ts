import { createSelector } from '@ngrx/store';
import { IStockSelectState } from './stock-state.model';

//Base selector to get the stock state
const stockDashboardSelector = (state: IStockSelectState) => state.stock;

//selector for fetching the stocks array from stock state
export const stocksSelector = createSelector(
  stockDashboardSelector,
  (state) => state.stocks,
);

//selector for fetching the laoding from stock state
export const loadingSelector = createSelector(
  stockDashboardSelector,
  (state) => state.loading,
);

//selector for fetching the error from stock state
export const errorSelector = createSelector(
  stockDashboardSelector,
  (state) => state.error,
);
