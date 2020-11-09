import { createEntityAdapter } from "@ngrx/entity";
import { EntityAdapter } from "@ngrx/entity";
import { EntityState } from "@ngrx/entity";
import { User } from "../../models/user.model";

/**
 * Feature name
 */
export const userFeatureKey = "user";

/**
 * State
 */
export interface State extends EntityState<User> {
  loading: boolean;
  selectedId?: string;
  error?: any;
}

/**
 * Adapter
 */
export const adapter: EntityAdapter<User>= createEntityAdapter<User>();

/**
 * Initial state
 */
export const initialState: State = adapter.getInitialState({
  loading: false,
});
