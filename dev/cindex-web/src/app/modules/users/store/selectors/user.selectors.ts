import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as UserState from "../states/user.state";

/**
 * Get User State
 */
export const getUserState = createFeatureSelector<UserState.State>(
  UserState.userFeatureKey
);


const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = UserState.adapter.getSelectors();

/**
 * Selet All
 */
//export const selectAll = createSelector(getUserState, (state) => (state?.ids as Array<string|number>)?.map(id => state?.entities[id]));

/**
 * Select Ids
 */
//export const selectIds = createSelector(getUserState, (state) => state?.ids);

/**
 * Get Total User Count
 */
//export const selectTotal = createSelector(getUserState, (state) => state?.ids?.length);

/**
 * Get User Entities
 */
//export const selectEntities = createSelector(getUserState, (state) => state?.entities);


/**
 * Get Loading
 */
export const getLoading = createSelector(getUserState, (state) => state.loading);

/**
 * Get Error
 */
export const getError = createSelector(getUserState, (state) => state.error);

/**
 * Get SelectedId
 */
export const getSelectedId = createSelector(
  getUserState,
  (state) => state.selectedId
);

/**
 * Get Users
 */
export const getUsers = createSelector(getUserState, selectAll);


/**
 * Get User
 */
export const getUser = createSelector(
  getSelectedId,
  selectEntities,
  (id, entities) => (id ? entities[id] : undefined)
);
