import { IAction, IError } from './stock-state.model';
import { ActionTypes } from './stock.actions';
import { StockReducer, initState } from './stock.reducers';

describe('StockReducer', () => {
  it('should handle ADD_STOCKS action', () => {
    const fetchInitCourses: IAction = {
      type: ActionTypes.ADD_STOCKS,
    };

    const newState = StockReducer(initState, fetchInitCourses);

    expect(newState.stocks).toEqual([]);
    expect(newState.loading).toEqual(true);
  });

  it('should handle ADD_STOCKS_SUCCESS action', () => {
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
    const fetchInitCoursesSuccess: IAction = {
      type: ActionTypes.ADD_STOCKS_SUCCESS,
      payload,
    };

    const newState = StockReducer(initState, fetchInitCoursesSuccess);

    expect(newState.stocks).toBeDefined();
    expect(newState.loading).toEqual(false);
  });

  it('should handle ADD_STOCKS_ERROR action', () => {
    const payload: IError = {
      errorMsg: '',
      errorCode: 0,
    };

    const fetchInitCoursesError: IAction = {
      type: ActionTypes.ADD_STOCKS_ERROR,
      payload,
    };

    const newState = StockReducer(initState, fetchInitCoursesError);

    expect(newState.error).toEqual(payload.errorMsg);
  });

  it('should handle REMOVE_STOCK action', () => {
    const setUpdateCourseAction: IAction = {
      type: ActionTypes.REMOVE_STOCK,
    };

    const newState = StockReducer(initState, setUpdateCourseAction);

    expect(newState.stocks).toBeDefined();
    expect(newState.error).toEqual(null);
  });
});
