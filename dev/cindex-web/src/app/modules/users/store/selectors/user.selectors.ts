import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as UserState from "../states/user.state";

/**
 * Selectors
 */
export const selectState = createFeatureSelector<UserState.State>(
  UserState.userFeatureKey
);
const { selectAll, selectEntities } = UserState.adapter.getSelectors();

export const getLoading = createSelector(selectState, (state) => state.loading);

export const getError = createSelector(selectState, (state) => state.error);

export const getSelectedId = createSelector(
  selectState,
  (state) => state.selectedId
);

export const getUsers = createSelector(selectState, selectAll);

export const getUserEntities = createSelector(selectState, selectEntities);

export const getUser = createSelector(
  getSelectedId,
  getUserEntities,
  (id, entities) => (id ? entities[id] : undefined)
);
