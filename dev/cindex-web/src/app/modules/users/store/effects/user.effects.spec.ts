import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { cold, hot } from 'jasmine-marbles';

import { UserEffects } from './user.effects';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';

describe('UserEffects', () => {

  let actions$: Observable<any>;
  let effects: UserEffects;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', [
            'createUser',
            'fetchUser',
            'fetchUsers',
            'updateUser',
            'removeUser',
          ]),
        },
      ],
    });
    effects = TestBed.inject(UserEffects);
    service = TestBed.inject(UserService)

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  /**
   * Add new Users
   */
  describe('addUser$', () => {

      // Outcome: Success
    it('should return addSuccess', () => {

        const user: User = {
          id: '1',
          gender: 'Female',
          firstname: 'Janie',
          lastname: 'Laria',
          username: 'jlaria',
          email: 'jlaria@gmail.com',
          country: 'uk'
        };

        const action = UserActions.addUser({ user });
        const completion = UserActions.addUserSuccess({ user });

        const response = cold('-b|', { b: user });
        const expected = cold('-c', { c: completion });

        actions$ = hot('a-', { a: action });
        service.createUser = () => response;

        expect(effects.create$).toBeObservable(expected);
    });
  });

  /**
   * Load Users
   */
  describe('loadUsers$', () => {
      // Outcome: Success
      it('should return loadUsersSuccess', () => {
        const users: User[] = [
          {
            id: '1',
            gender: 'Female',
            firstname: 'Janie',
            lastname: 'Laria',
            username: 'jlaria',
            email: 'jlaria@gmail.com',
            country: 'uk'
          },
          {
            id: '2',
            gender: 'Male',
            firstname: 'Jack',
            lastname: 'Laria',
            username: 'jlaria',
            email: 'jlaria@gmail.com',
            country: 'uk'
          }
        ];

        const response = cold('-a|', { a: users });
        service.fetchUsers = () => response;

        const offset = 0;
        const limit = 100;

        const action = UserActions.loadAll({ offset, limit });
        const completion = UserActions.loadAllSuccess({ users })

        const expected = cold('--b', { b: completion });
        actions$ = hot('-a', { a: action });

        expect(effects.loadAll$).toBeObservable(expected);
      });

      // Outcome: Failure
      it('should return loadUsersFailure', () => {
        const error = 'error';
        const response = cold('-#', {}, error);
        service.fetchUsers = () => response;

        const offset = 0;
        const limit = 100;

        const action = UserActions.loadAll({ offset, limit });
        const completion = UserActions.loadAllFailure({ error });

        const expected = cold('--c', { c: completion });
        actions$ = hot('-a', { a: action });

        expect(effects.loadAll$).toBeObservable(expected);
        });
  });

  /**
   * Load User
   */
  describe('loadUser$', () => {
    // Outcome: Success
    it('should return loadUserSuccess', () => {
      const user: User = {
        id: '1',
        gender: 'Female',
        firstname: 'Janie',
        lastname: 'Laria',
        username: 'jlaria',
        email: 'jlaria@gmail.com',
        country: 'uk'
      };

      const response = cold('-b', { b: user });
      service.fetchUser = () => response;

      const id = '1';
      const action = UserActions.load({ id });
      const completion = UserActions.loadSuccess({ user });

      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.load$).toBeObservable(expected);
    });

    // Outcome: Failure
    it('should return loadUserFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.fetchUser = () => response;

      const id = '1';
      const action = UserActions.load({ id });
      const completion = UserActions.loadFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.load$).toBeObservable(expected);
    });
  });

  /**
   * Update Users
   */
  describe('update$', () => {
    // Outcome: Success
    it('should return updateUserSuccess', () => {
      const user: User = {
        id: '1',
        gender: 'Female',
        firstname: 'Janie',
        lastname: 'Laria',
        username: 'jlaria',
        email: 'jlaria@gmail.com',
        country: 'uk'
      };
      const response = cold('-b', { b: user });
      service.updateUser = () => response;

      const action = UserActions.update({ user });
      const completion = UserActions.updateSuccess({ user });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.update$).toBeObservable(expected);
    });

    // Outcome: Failure
    it('should return updateUserFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.updateUser = () => response;

      const user: User = {
        id: '1',
        gender: 'Female',
        firstname: 'Janie',
        lastname: 'Laria',
        username: 'jlaria',
        email: 'jlaria@gmail.com',
        country: 'uk'
      };
      const action = UserActions.update({ user });
      const completion = UserActions.updateFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.update$).toBeObservable(expected);
    });
  });

  /**
   * Remove Users
   */
  describe('remove$', () => {
    // Outcome: Success
    it('should return removeSuccess', () => {
      const id = '1';
      const response = cold('-b', { b: id });
      service.removeUser = () => response;

      const action = UserActions.remove({ id });
      const completion = UserActions.removeSuccess({ id });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.remove$).toBeObservable(expected);
    });

    // Outcome: Failure
    it('should return removeFailure', () => {
      const error = 'error';
      const response = cold('-#', {}, error);
      service.removeUser = () => response;

      const id = '1';
      const action = UserActions.remove({ id });
      const completion = UserActions.removeFailure({ error });
      const expected = cold('--c', { c: completion });
      actions$ = hot('-a', { a: action });

      expect(effects.remove$).toBeObservable(expected);
    });
  });

});
