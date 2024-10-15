import { IAction, ICourseResponse, IError } from './stock-state.model';
import { ActionTypes } from './stock.actions';
import { LmsDashboardReducer, initState } from './stock.reducers';

describe('LmsDashboardReducer', () => {
  it('should handle FETCH_INIT_COURSES action', () => {
    const fetchInitCourses: IAction = {
      type: ActionTypes.FETCH_INIT_COURSES,
    };

    const newState = LmsDashboardReducer(initState, fetchInitCourses);

    expect(newState.courses).toEqual(null);
    expect(newState.loading).toEqual(true);
  });

  it('should handle FETCH_INIT_COURSES_SUCCESS action', () => {
    const payload: ICourseResponse = {
      courses: [],
      lastUpdated: '',
      totalCourses: [],
    };

    const fetchInitCoursesSuccess: IAction = {
      type: ActionTypes.FETCH_INIT_COURSES_SUCCESS,
      payload,
    };

    const newState = LmsDashboardReducer(initState, fetchInitCoursesSuccess);

    expect(newState.courses).toBeDefined();
    expect(newState.loading).toEqual(false);
  });

  it('should handle FETCH_INIT_COURSES_ERROR action', () => {
    const payload: IError = {
      errorMsg: '',
      errorCode: '',
    };

    const fetchInitCoursesError: IAction = {
      type: ActionTypes.FETCH_INIT_COURSES_ERROR,
      payload,
    };

    const newState = LmsDashboardReducer(initState, fetchInitCoursesError);

    expect(newState.error).toEqual(payload);
    expect(newState.courses).toEqual([]);
  });

  it('should handle SET_UPDATED_COURSES action', () => {
    const setUpdateCourseAction: IAction = {
      type: ActionTypes.SET_UPDATED_COURSES,
    };

    const newState = LmsDashboardReducer(initState, setUpdateCourseAction);

    expect(newState.courses).toBeUndefined();
  });

  it('should handle REFRESH_LAST_UPDATED action', () => {
    const refreshLastAction: IAction = {
      type: ActionTypes.REFRESH_LAST_UPDATED,
    };

    const newState = LmsDashboardReducer(initState, refreshLastAction);

    expect(newState.lastUpdated).toBeUndefined();
  });
});
