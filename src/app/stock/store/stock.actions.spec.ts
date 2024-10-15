import { ICourse, ICourseResponse, IError } from './stock-state.model';
import * as lmsDashboardActions from './stock.actions';

describe('FetchInitCourses', () => {
  it('should initite the courses', () => {
    const action = new lmsDashboardActions.FetchInitCourses();
    expect(action.type).toBe(
      lmsDashboardActions.ActionTypes.FETCH_INIT_COURSES,
    );
  });
});

describe('FetchInitCoursesSuccess', () => {
  it('should call success when effect is complete', () => {
    const payload: ICourseResponse = {
      courses: [],
      lastUpdated: '',
      totalCourses: [],
    };
    const action = new lmsDashboardActions.FetchInitCoursesSuccess(payload);
    expect(action.type).toBe(
      lmsDashboardActions.ActionTypes.FETCH_INIT_COURSES_SUCCESS,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('FetchInitCoursesError', () => {
  it('should call error when effect has error', () => {
    const payload: IError = {
      errorMsg: '',
      errorCode: '',
    };
    const action = new lmsDashboardActions.FetchInitCoursesError(payload);
    expect(action.type).toBe(
      lmsDashboardActions.ActionTypes.FETCH_INIT_COURSES_ERROR,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('SetUpdatedCourses', () => {
  it('should call SetUpdatedCourses for storing user inputs', () => {
    const payload: ICourse[] = [];
    const action = new lmsDashboardActions.SetUpdatedCourses(payload);
    expect(action.type).toBe(
      lmsDashboardActions.ActionTypes.SET_UPDATED_COURSES,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('RefreshLastUpdated', () => {
  it('should call RefreshLastUpdated for storing user inputs', () => {
    const payload: string = '';
    const action = new lmsDashboardActions.RefreshLastUpdated(payload);
    expect(action.type).toBe(
      lmsDashboardActions.ActionTypes.REFRESH_LAST_UPDATED,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});
