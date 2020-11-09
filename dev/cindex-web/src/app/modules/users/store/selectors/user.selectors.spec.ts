import { User } from '../../models/user.model';
import { State, initialState, adapter, userFeatureKey } from '../states/user.state';

import * as UserSelectors from './user.selectors';

describe('UserSelectors', () => {
  it('should select the feature state', () => {

    interface UserState {
      [userFeatureKey]: State;
    }

    const users: User[] = [
      {
        id: '1',
        gender: 'Female',
        firstname: 'Janie',
        lastname: 'Laria',
        username: 'jlaria',
        email: 'jlaria@gmail.com',
        country: 'uk'
      },
      {
        id: '2',
        gender: 'Male',
        firstname: 'James',
        lastname: 'Matthis',
        username: 'jmathis',
        email: 'jmatthis@gmail.com',
        country: 'de'
      }
    ];

    const state: UserState = {
      [userFeatureKey]: adapter.setAll(users, {
        ...initialState,
        loading: true,
        selectedId: '1',
      }),
    };

    expect(UserSelectors.getLoading(state)).toEqual(state.user.loading);
    expect(UserSelectors.getError(state)).toEqual(state.user.error);
    expect(UserSelectors.getSelectedId(state)).toEqual(state.user.selectedId);
    // expect(UserSelectors.getUser(state)).toEqual(users[0]);
    //expect(UserSelectors.getUsers(state)).toEqual(users);
  });
});
