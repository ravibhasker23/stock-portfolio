import { initState } from './stock.reducers';
import * as stockDashboardSelector from './stock.selector';

describe('stockDashboardSelector', () => {
  const state = {
    stock: initState,
  };

  describe('stocksSelector', () => {
    it('should return the value of page from state', () => {
      const stocksSelectorState = stockDashboardSelector.stocksSelector(state);
      expect(stocksSelectorState).toBeDefined();
    });
  });

  describe('loadingSelector', () => {
    it('should return the value of page from state', () => {
      const loadingSelectorState =
        stockDashboardSelector.loadingSelector(state);
      expect(loadingSelectorState).toBeDefined();
    });
  });

  describe('errorSelector', () => {
    it('should return the value of page from state', () => {
      const errorSelectorState = stockDashboardSelector.errorSelector(state);
      expect(errorSelectorState).toBeDefined();
    });
  });
});
