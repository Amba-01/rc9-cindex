import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppConfigManager } from 'src/app/utils/app.config.manager';
import { UserFacade } from '../../facades/user.facade';
import { User } from '../../models/user.model';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userFacade: UserFacade;

  const user: User = generateUser("1", "Jamsy");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ SignUpComponent ],
      providers: [AppConfigManager, UserFacade]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    userFacade = TestBed.inject(UserFacade);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser', () => {
    spyOn(userFacade, 'create').and.callThrough();
    spyOn(userFacade, 'load').and.callThrough();
    spyOn(userFacade, 'loadAll').and.callThrough();
    spyOn(userFacade, 'remove').and.callThrough();

    component.ngOnInit();
    component.createUser(user);

    expect(userFacade.create).toHaveBeenCalled();
    expect(userFacade.create).toHaveBeenCalledTimes(1);
    expect(userFacade.create).toHaveBeenCalledWith(user)

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
