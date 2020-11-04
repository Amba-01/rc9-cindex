import { ActionReducer, MetaReducer } from "@ngrx/store";
import {
  RouterReducerState,
  RouterStateSerializer,
} from "@ngrx/router-store";
import { RouterStateSnapshot, Params } from "@angular/router";
import * as UserState from "../../modules/users/store/states/user.state";

/**
 * Root State
 */
export interface State {
  [UserState.userFeatureKey]: UserState.State;
  router: RouterReducerState<RouterStateUrl>;
}


/**
 * Router State
 */
export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

/**
 * State Serializer
 */
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
