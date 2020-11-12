import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

/**
 * Create User Actions
 */
export const addUser = createAction(
  "[User] Add",
 props<{ user: User }>());

export const addUserSuccess = createAction(
  "[User] Add Success",
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  "[User] Add Failure", props<{ error: any }>()
);

/**
 * Load User Actions
 */
export const load = createAction(
  "[User] Load", props<{ id: string }>()
);

export const loadSuccess = createAction(
  "[User] Load Success", props<{ user: User }>()
);

export const loadFailure = createAction(
  "[User] Load Failure", props<{ error: any }>()
);

/**
 * Load Users Actions
 */
export const loadAll = createAction(
  "[User] Load All", props<{ offset?: number; limit?: number }>()
);

export const loadAllSuccess = createAction(
  "[User] Load All Success", props<{ users: User[] }>()
);

export const loadAllFailure = createAction(
  "[User] Load All Failure", props<{ error: any }>()
);

/**
 * Update User Actions
 */
export const update = createAction(
  "[User] Update", props<{ user: User }>()
);

export const updateSuccess = createAction(
  "[User] Update Success", props<{ user: User }>()
);

export const updateFailure = createAction(
  "[User] Update Failure", props<{ error: any }>()
);

/**
 * Remove User Actions
 */
export const remove = createAction(
  "[User] Remove", props<{ id: string }>()
);

export const removeSuccess = createAction(
  "[User] Remove Success", props<{ id: string }>()
);

export const removeFailure = createAction(
  "[User] Remove Failure",
  props<{ error: any }>()
);
