import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import {
  RouterStateSerializer,
  RouterReducerState,
  routerReducer,
} from "@ngrx/router-store";
import * as UserState from "../../modules/users/store/states/user.state";
import { RouterStateSnapshot, Params } from "@angular/router";
import { environment } from "../../../environments/environment";
import * as userReducer from "../../modules/users/store/reducers/user.reducer";

export interface State {
  [UserState.userFeatureKey]: UserState.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  [UserState.userFeatureKey]: userReducer.reducer,
  router: routerReducer,
};

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
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

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
