import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from '../../models/user.model';
import * as UserState from "../states/user.state";

/**
 * Get User State
 */
export const getUserState = createFeatureSelector<UserState.State>(
  UserState.userFeatureKey
);


/**
 * Selet All
 */
export const getAllUsers = createSelector(getUserState, (state) => (state?.ids as Array<string|number>)?.map(id => state?.entities[id]));

/**
 * Select Ids
 */
export const getUserIds = createSelector(getUserState, (state) => state?.ids);

/**
 * Get Total User Count
 */
export const getTotalUsers = createSelector(getUserState, (state) => state?.ids?.length);

/**
 * Get User Entities
 */
export const getUserEntities = createSelector(getUserState, (state) => state?.entities);


/**
 * Get Loading
 */
export const getLoading = createSelector(getUserState, (state) => state.loading);

/**
 * Get Error
 */
export const getUserError = createSelector(getUserState, (state) => state.error);

/**
 * Get SelectedId
 */
export const getId = createSelector(
  getUserState,
  (state) => state.selectedId
);


/**
 * Get User
 */
export const getUser = createSelector(
  getId,
  getUserEntities,
  (id, entities) => (id ? entities[id] : undefined)
);

/**
 * Get Users
 */

export const getUsers = createSelector(getUserState, (state) => {
  let users = [];
  for (const [key, value] of Object.entries((state?.ids as Array<string|number>)?.map(id => state?.entities[id]))) {
    users.push(value)
  }
  return users;
})

//export const getUsers = createSelector(getUserState, getAllUsers);
