import * as fromUserState from '../states/user.state';
import { selectState } from './user.selectors';

describe('Agent Selectors', () => {
  it('should select the feature state', () => {
    const result = selectState({
      [fromUserState.userFeatureKey]: {}
    });

    //expect(result).toEqual({});
  });
});
