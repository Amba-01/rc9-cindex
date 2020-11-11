import { UserFacade } from "./user.facade";
import * as UserState from "../store/states/user.state";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { User } from '../models/user.model';
import * as UserActions from '../store/actions/user.actions';
import { Store } from '@ngrx/store';

describe('UserFacade', ()=>{

  let store: Store<UserState.State>;
  let facade: UserFacade;

  const user: User = generateUser("1", "Jamsy");

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [provideMockStore()],
      });
      store = TestBed.inject(Store);
      spyOn(store, 'dispatch').and.callThrough();
      spyOn(store, 'pipe').and.callThrough();
      facade = TestBed.inject(UserFacade);
    })
  );


  it('should call create', () => {
    const action = UserActions.addUser({ user });
    facade.create(user);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call load', () => {
    const id = '1';
    const action = UserActions.load({ id });
    facade.load(id);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call update', () => {
    const action = UserActions.update({ user });
    facade.update(user);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call loadAll', async () => {

    const action = UserActions.loadAll({ offset: 0, limit: 100 });
    facade.loadAll(0, 100);
    expect(store.dispatch).toHaveBeenCalledWith(action);

  });

  it('should call remove', () => {
    const id = '1';
    const action = UserActions.remove({ id });
    facade.remove(id);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});

function generateUser(userId: string, name: string): User {
  const user: User = {
    id: userId,
    gender: 'Female',
    firstname: 'Janie',
    lastname: 'Laria',
    username: name,
    email: name+'@gmail.com',
    country: 'uk'
  }
  return user
}
