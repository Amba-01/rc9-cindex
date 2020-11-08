import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Action, select } from '@ngrx/store';

import * as UserSelectors from "../store/selectors/user.selectors";
import * as UserState from "../store/states/user.state";
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class Userfacade {

  constructor(
    private store: Store<UserState.State>,
  ){}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  get users$(): Observable<User[]> {
    return this.store.pipe(select(UserSelectors.getUsers));
  }

}
