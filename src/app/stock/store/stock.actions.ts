import { IAction, IAddStock, IError, IStock } from './stock-state.model';

export enum ActionTypes {
  ADD_STOCKS = '[STOCK] Add stocks',
  ADD_STOCKS_SUCCESS = '[STOCK] ADd stocks success',
  ADD_STOCKS_ERROR = '[STOCK] Add stocks error',
  REMOVE_STOCK = '[STOCK] Remove stocks error',
}

export class AddStock implements IAction {
  readonly type: ActionTypes = ActionTypes.ADD_STOCKS;
  constructor(public payload: any) {}
}

export class AddStockSuccess implements IAction {
  readonly type: ActionTypes = ActionTypes.ADD_STOCKS_SUCCESS;
  constructor(public payload: { stock: IStock }) {}
}

export class AddStockError implements IAction {
  readonly type: ActionTypes = ActionTypes.ADD_STOCKS_ERROR;
  constructor(public payload: IError) {}
}

export class RemoveStock implements IAction {
  readonly type: ActionTypes = ActionTypes.REMOVE_STOCK;
  constructor(public payload: string) {}
}
