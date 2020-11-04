import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  concatMap,
} from "rxjs/operators";

import * as UserActions from "../actions/user.actions";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  /**
   * Create User
   */
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => UserActions.addUserSuccess({ user })),
          catchError((error) => of(UserActions.addUserFailure({ error })))
        )
      )
    )
  );

  /**
   * Update User
   */
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.update),
      mergeMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map((user) => UserActions.updateSuccess({ user })),
          catchError((error) => of(UserActions.updateFailure({ error })))
        )
      )
    )
  );
  /**
   * Load User
   */
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.load),
      concatMap(({ id }) =>
        this.userService.fetchUser(id).pipe(
          map((user) => UserActions.loadSuccess({ user })),
          catchError((error) => of(UserActions.loadFailure({ error })))
        )
      )
    )
  );
  /**
   * Load Users
   */
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAll),
      switchMap(({ offset, limit }) =>
        this.userService.fetchUsers(offset, limit).pipe(
          map((result) => UserActions.loadAllSuccess({ users: result })),
          catchError((error) => of(UserActions.loadAllFailure({ error })))
        )
      )
    )
  );

  /**
   * Delete User
   */
  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.remove),
      concatMap((action) =>
        this.userService.removeUser(action.id).pipe(
          map((result) => UserActions.removeSuccess({ id: result })),
          catchError((error) => of(UserActions.removeFailure({ error })))
        )
      )
    )
  );
}
