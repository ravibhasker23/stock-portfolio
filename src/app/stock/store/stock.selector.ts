import { createSelector } from '@ngrx/store';
import { IStockSelectState } from './stock-state.model';

const stockDashboardSelector = (state: IStockSelectState) => state.stock;

//selector for fetching the stocks
export const stocksSelector = createSelector(
  stockDashboardSelector,
  (state) => state.stocks,
);

export const loadingSelector = createSelector(
  stockDashboardSelector,
  (state) => state.loading,
);

export const errorSelector = createSelector(
  stockDashboardSelector,
  (state) => state.error,
);
