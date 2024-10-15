import { initState } from './stock.reducers';
import * as courseSelector from './stock.selector';

describe('LmsDashboardSelector', () => {
  const state = {
    lmsDashboard: initState,
  };

  describe('courseSelector', () => {
    it('should return the value of page from state', () => {
      const courseSelectorState = courseSelector.courseSelector(state);
      expect(courseSelectorState).toBeDefined();
    });
  });

  describe('totalCourseSelector', () => {
    it('should return the value of page from state', () => {
      const totalCourseSelectorState =
        courseSelector.totalCourseSelector(state);
      expect(totalCourseSelectorState).toBeDefined();
    });
  });

  describe('lastUpdateSelector', () => {
    it('should return the value of page from state', () => {
      const lastUpdateSelectorState = courseSelector.lastUpdateSelector(state);
      expect(lastUpdateSelectorState).toBeDefined();
    });
  });
});
