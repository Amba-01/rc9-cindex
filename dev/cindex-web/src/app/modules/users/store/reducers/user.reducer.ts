import * as UserActions from "../actions/user.actions";
import { Action, createReducer, on } from "@ngrx/store";
import { adapter, initialState, State } from "../states/user.state";

const userReducer = createReducer(
  initialState,
  /**
   * Create User Operations
   */
  on(UserActions.addUser, (state) => {
    console.log("New User")
    return { ...state, loading: true };
  }),

  on(UserActions.addUserSuccess, (state, { user }) => {
    return adapter.addOne(user, { ...state, loading: false });
  }),

  on(UserActions.addUserFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),


  /**
   * Load User Operations
   */
  on(UserActions.load, (state, { id }) => {
    return { ...state, loading: true, selectedId: id };
  }),

  on(UserActions.loadSuccess, (state, { user }) => {
    return adapter.upsertOne(user, { ...state, loading: false });
  }),

  on(UserActions.loadFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),


  /**
   * Load Users Operations
   */
  on(UserActions.loadAll, (state) => {
    return { ...state, loading: true };
  }),

  on(UserActions.loadAllSuccess, (state, { users }) => {
    return adapter.setAll(users, { ...state, loading: false });
  }),

  on(UserActions.loadAllFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  /**
   * Update User Operations
   */
  on(UserActions.update, (state) => {
    return { ...state, loading: true };
  }),

  on(UserActions.updateSuccess, (state, { user }) => {
    return adapter.updateOne(
      { id: user.id, changes: user },
      { ...state, loading: false }
    );
  }),

  on(UserActions.updateFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  /**
   * Remove User Operations
   */
  on(UserActions.remove, (state) => {
    return { ...state, loading: true };
  }),

  on(UserActions.removeSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, loading: false });
  }),

  on(UserActions.removeFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
