import { Injectable } from '@angular/core';
import { Store, Action, select } from '@ngrx/store';
import { User } from '../models/user.model';

import * as UserActions from "../store/actions/user.actions";
import * as UserSelectors from "../store/selectors/user.selectors";
import * as UserState from "../store/states/user.state";

@Injectable({ providedIn: 'root' })
export class UserFacade {

  isLoading$ = this.store.pipe(select(UserSelectors.getLoading));
  currentUser$ = this.store.pipe(select(UserSelectors.getUser));
  users$ = this.store.pipe(select(UserSelectors.getUsers));

  constructor(
    private store: Store<UserState.State>,
  ){}

  /**
   * Create
   * @param user User
   */
  create(user: User): void {
    this.store.dispatch(UserActions.addUser({ user }));
  }

  /**
   * Load all
   * @param offset Offset
   * @param limit Limit
   */
  loadAll(offset?: number, limit?: number): void {
    this.store.dispatch(UserActions.loadAll({ offset, limit }));
  }

  /**
   * Load
   * @param id ID
   */
  loadById(id: string): void {
    this.store.dispatch(UserActions.load({ id }));
  }

  /**
   * Load
   * @param username Username
   */
  loadByUsername(username: string): void {

  }

  /**
   * Update
   * @param user User
   */
  update(user: User): void {
    this.store.dispatch(UserActions.update({ user }));
  }

  /**
   * Remove
   * @param id ID
   */
  remove(id: string): void {
    this.store.dispatch(UserActions.remove({ id }));
  }
}
