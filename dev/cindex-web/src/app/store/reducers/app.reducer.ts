import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";

import * as UserState from "../../modules/users/store/states/user.state";
import * as userReducer from "../../modules/users/store/reducers/user.reducer";
import * as fromRoot from "../state/app.state"
import { environment } from 'src/environments/environment';

/**
 * Root Reducer
 */
export const reducers: ActionReducerMap<fromRoot.State> = {
  [UserState.userFeatureKey]: userReducer.reducer,
  router: routerReducer,
};

/**
 * Logger
 */
export function logger(reducer: ActionReducer<fromRoot.State>): ActionReducer<fromRoot.State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("prev state", state);
    console.log("action", action);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}

/**
 * Meta Reducer
 */
export const metaReducers: MetaReducer<fromRoot.State>[] = !environment.production
  ? [logger]
  : [];
