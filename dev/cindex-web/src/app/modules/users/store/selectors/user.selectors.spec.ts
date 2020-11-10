import { User } from '../../models/user.model';
import { State, initialState, adapter, userFeatureKey } from '../states/user.state';

import * as UserSelectors from './user.selectors';

describe('UserSelectors', () => {
  it('should select the feature state', () => {

    interface UserState {
      [userFeatureKey]: State;
    }

    let user1: User = generateUser("1", "Jamsy");
    let user2: User = generateUser("2", "Jack");

    const users: User[] = [user1, user2];

    const state: UserState = {
      [userFeatureKey]: adapter.setAll(users, {
        ...initialState,
        loading: true,
        selectedId: '1',
      }),
    };

    expect(UserSelectors.getUserEntities(state)).toEqual(state.user.entities);
    expect(UserSelectors.getUserIds(state)).toEqual(['1', '2']);
    expect(UserSelectors.getTotalUsers(state)).toEqual(2);
    expect(UserSelectors.getLoading(state)).toEqual(state.user.loading);
    expect(UserSelectors.getUserError(state)).toEqual(state.user.error);
    expect(UserSelectors.getId(state)).toEqual(state.user.selectedId);
    expect(UserSelectors.getUser(state)).toEqual(users[0]);
    expect(UserSelectors.getUsers(state)).toEqual(users);
  });
});

function generateUser(userId: string, name: string): User {
  const user: User = {
    id: userId,
    gender: 'Female',
    firstname: 'Janie',
    lastname: 'Laria',
    username: name,
    email: name+'@gmail.com',
    country: 'uk'
  }
  return user
}
