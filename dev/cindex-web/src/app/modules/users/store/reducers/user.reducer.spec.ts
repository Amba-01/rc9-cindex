import { reducer } from './user.reducer';
import { State, initialState, adapter } from '../states/user.state';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';

describe('UserReducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
});

/**
 * When a "[User] Load All" action is triggered, expected State should have loading = true
 */
describe('UserActions', () => {
  it('should handle LoadAll', () => {
    const state: State = {
      ...initialState
    };

    const expected: State = {
      ...initialState,
      loading: true
    };
    const action = UserActions.loadAll({offset:0, limit:100});
    expect(reducer(state, action)).toEqual(expected);
  })

/**
 * When a "[User] Load All Success" action is triggered, expected State should have loading = true
 */
  it('should handle loadAllSuccess Action', () => {

    let user1: User = generateUser("1", "Jamsy");
    let user2: User = generateUser("2", "Jack");

    const users: User[] = [user1, user2];

    const state: State = {
      ...initialState,
      loading: true
    }

    const expected: State = adapter.setAll(users, {
      ...state,
      loading: false
    })

    const action = UserActions.loadAllSuccess({ users })
    expect(reducer(state, action)).toEqual(expected)
  })

/**
 * When a "[User] Load All Failure" action is triggered, expected State should have loading = true
 */
it('should handle loadFailure', ()=>{

  const state: State = {
    ...initialState,
    loading: false,
    error : 'error'
  };

  const expected: State = {
    ...state,
    loading: false,
    error : 'error'
  };

  const action = UserActions.loadAllFailure({ error : 'error' });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] Load
 */
it('should handle load', () => {
  const id = '1';

  const state: State = {
    ...initialState,
    loading: false
  };

  const expected: State = {
    ...state,
    loading: true,
    selectedId: id
  }

  const action = UserActions.load({ id });

  expect(reducer(state, action)).toEqual(expected);
})

/**
 * When a "[User] Load Success
 */
it('should handle loadSuccess', () => {

let user: User = generateUser("1", "Jamsy");

  const state: State = {
    ...initialState,
    loading: true,
    selectedId: user.id
  };

  const expected: State = adapter.upsertOne(user, {
    ...state,
    loading: false
  });
  const action = UserActions.loadSuccess({ user });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] Load Failure
 */
it('should handle loadFailure', () => {
  const error = 'error';

  const state: State = {
    ...initialState,
    loading: true
  };

  const expected: State = {
    ...state,
    loading: false,
    error,
  };

  const action = UserActions.loadFailure({ error });
  expect(reducer(state, action)).toEqual(expected);
})

/**
 * When a "[User] Add
 */
it('should handle add', () => {

  let user: User = generateUser("1", "Jamsy");

  const state: State = {
    ...initialState,
    loading: false,
  };
  const expected: State = {
    ...state,
    loading: true,
  };
  const action = UserActions.addUser({ user });
  expect(reducer(state, action)).toEqual(expected);
})

/**
 * When a "[User] Add Success
 */
it('should handle AddSuccess', () => {

  let user: User = generateUser("1", "Jamsy");

  const state: State = {
    ...initialState,
    loading: true,
  };
  const expected: State = adapter.addOne(user, {
    ...state,
    loading: false,
  });
  const action = UserActions.addUserSuccess({ user });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] Add Failure
 */
it('should handle addFailure', () => {
  const error = 'error';

  const state: State = {
    ...initialState,
    loading: true,
  };

  const expected: State = {
    ...state,
    loading: false,
    error,
  };
  const action = UserActions.addUserFailure({ error });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] update
 */
it('should handle update', () => {

  let user: User = generateUser("1", "Jamsy");
  let updatedUser: User = generateUser("1", "Jack");

  const state: State = adapter.addOne( updatedUser, { ...initialState });

  const expected: State = {
    ...state,
    loading: true,
  };
  const action = UserActions.update({ user });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] updateSuccess
 */
it('should handle updateSuccess', () => {
  let user: User = generateUser("1", "Jamsy");
  let updatedUser: User = generateUser("1", "Jack");

  const state: State = adapter.addOne(updatedUser, { ...initialState, loading: true });

  const expected: State = adapter.updateOne(
    { id: user.id, changes: user },
    { ...state, loading: false }
  );

  const action = UserActions.updateSuccess({ user });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] updateFailure
 */
it('should handle updateFailure', () => {
  const error = 'error';

  const state: State = {
    ...initialState,
    loading: true,
  };

  const expected: State = {
    ...state,
    loading: false,
    error,
  };

  const action = UserActions.updateFailure({ error });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] remove
 */
it('should handle remove', () => {
  const id = '2';

  let user1: User = generateUser("1", "Jamsy");
  let user2: User = generateUser("2", "Jack");

  const users: User[] = [user1, user2];

  const state: State = adapter.setAll(users, { ...initialState });

  const expected: State = {
    ...state,
    loading: true,
  };

  const action = UserActions.remove({ id });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] removeSuccess
 */
it('should handle removeSuccess', () => {
  const id = '2';

  let user1: User = generateUser("1", "Jamsy");
  let user2: User = generateUser("2", "Jack");

  const users: User[] = [user1, user2];

  const state: State = adapter.setAll(users, {
    ...initialState,
    loading: false,
  });

  const expected: State = adapter.removeOne(id, { ...state });
  const action = UserActions.removeSuccess({ id });
  expect(reducer(state, action)).toEqual(expected);
});

/**
 * When a "[User] removeFailure
 */
it('should handle removeFailure', () => {

  let user1: User = generateUser("1", "Jamsy");
  let user2: User = generateUser("2", "Jack");

  const users: User[] = [user1, user2];

  const error = 'error';
  const state: State = adapter.setAll(users, {
    ...initialState,
    loading: true,
  });
  const expected: State = {
    ...state,
    loading: false,
    error,
  };
  const action = UserActions.removeFailure({ error });
  expect(reducer(state, action)).toEqual(expected);
});

})

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
