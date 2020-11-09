import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
  });

   service = TestBed.inject(UserService);
   httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createUser should send a POST request and return the newly created user', (done) => {

    const newUser: User = {
      id: '1',
      gender: 'Female',
      firstname: 'Janie',
      lastname: 'Laria',
      username: 'jlaria',
      email: 'jlaria@gmail.com',
      country: 'uk'
    }

    service.createUser(newUser).subscribe((user: User) => {
        expect(user).toBeDefined();
        expect(user).toEqual(newUser);
        done()
      },
      (error) => { fail(error.message) }
    );

    let req = httpMock.expectOne('http://localhost:1323/users');
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  /**
   * Fetch single User
  */
  describe('fetchUser', () => {
    //Outcome: Success
    it('getSingleUser should send a GET request and return a single user', (done) => {
      const existingUser: User = {
        id: '1',
        gender: 'Female',
        firstname: 'Janie',
        lastname: 'Laria',
        username: 'jlaria',
        email: 'jlaria@gmail.com',
        country: 'uk'
      }
      service.fetchUser("1").subscribe(
        (user: User) => { expect(user).toBeDefined(); done(); },
        (error) => { fail(error.message) }
      );

      const testRequest = httpMock.expectOne('http://localhost:1323/users/1');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush(existingUser);

    });
/**
    //Outcome: Failure
    it('getSingleUser should throw an error if 3 request attempts fail', (done) => {
      let id: string = "1";

      const errMessage = `Failed to fetch user with id ${id}`;
      service.fetchUser(id).subscribe(
        data => { fail('The request is supposed to throw an error') },
        (error: string) => { expect(error).toEqual(errMessage); done(); },
      );

      const retryCount = 3;
      for (let i = 0; i <= retryCount; i++) {
        httpMock
          .expectOne({url: 'http://localhost:1323/users/1', method: 'GET'})
          .flush({}, { status: 404, statusText: errMessage });
      }
    }); */
  })

  /**
   * Fetch all Users
   */
  describe('getAllUsers', () => {
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
    //Outcome: Success
    it('should send a GET request and return an array of users', (done) => {
      service.fetchUsers().subscribe(
        (data: User[]) => {
          expect(data).toBeDefined();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(2);
          done();
        },
        (error: HttpErrorResponse) => { fail('The request was supposed to return data') }
      );

      const req = httpMock.expectOne('http://localhost:1323/users');
      expect(req.request.method).toBe('GET');
      req.flush(users);
    });

    //Outcome: Failure
    /*
    it('should return an empty array if an Interal Server Error occurs', (done) => {
      service.fetchUsers().subscribe(
        (data: User[]) => {
          expect(data).toBeDefined();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(0);
          done()
        },
        (error: HttpErrorResponse) => { fail('The request was supposed to return an empty array') }
      );

      const req = httpMock.expectOne('http://localhost:1323/users');
      expect(req.request.method).toBe('GET');
      req.flush({}, { status: 500, statusText: 'Internal Server Error' });

    })*/
  });

  /**
   * Update User

  describe('updateUser', () => {
    let logErrorSpy: jasmine.Spy;

    beforeEach(() => {
      logErrorSpy = spyOn(service, 'logError');
    })

    it('should display an error message if the request is unauthorized', (done) => {
      const newUser: User = {
        id: '1',
        gender: 'Female',
        firstname: 'Janie',
        lastname: 'Laria',
        username: 'jlaria',
        email: 'jlaria@gmail.com',
        country: 'uk'
      }

      service.updateUser(newUser)
        .subscribe(
          (data => {
            expect(data).toBeNull();
            expect(logErrorSpy).toHaveBeenCalledWith('Unauthorized request');
            done();
          }),
          (error: HttpErrorResponse) => { fail('The Observable is not supposed to fail') }

      );

      const req = httpMock.expectOne('http://localhost:1323/users/1');
      expect(req.request.method).toBe('PUT');
      req.flush(null, { status: 401, statusText: 'Unauthorized request'});

    });
  })*/
});
