import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as UserState from "../states/user.state";

/**
 * SeletAll && SelectEntities
 */
const { selectAll, selectEntities } = UserState.adapter.getSelectors();

/**
 * Get User State
 */
export const getUserState = createFeatureSelector<UserState.State>(
  UserState.userFeatureKey
);

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
 * Get User Entities
 */
export const getUserEntities = createSelector(getUserState, selectEntities);

/**
 * Get User
 */
export const getUser = createSelector(
  getSelectedId,
  getUserEntities,
  (id, entities) => (id ? entities[id] : undefined)
);
