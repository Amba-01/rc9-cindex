import { HttpErrorResponse } from '@angular/common/http';
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

  /**
   * Create new User
  */
  describe('createUser', () => {
    /**
     * Outcome: Success
    */
    it('createUser should send a POST request and return the newly created user', (done) => {

      const newUser: User = generateUser("1", "Jamsy");

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
  });

  /**
   * Update User
  */
  describe('updateUser', () => {
    it('should successfully mock update request', () => {

      const user: User = generateUser("1", "Jamsy");

      service.updateUser(user).subscribe((data) => {
        expect(data).toEqual(user);
      });
      const req = httpMock.expectOne(`http://localhost:1323/users/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(user);
    });
  })

  /**
   * Fetch Single User
  */
  describe('fetchUser', () => {
    //Outcome: Success
    it('fetchUser should send a GET request and return a single user', (done) => {

      let userId = "1";

      const existingUser: User = generateUser(userId, "Jamsy");

      service.fetchUser(userId).subscribe(
        (user: User) => { expect(user).toBeDefined(); done(); },
        (error) => { fail(error.message) }
      );

      const testRequest = httpMock.expectOne('http://localhost:1323/users/'+userId);
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush(existingUser);
    });
  })

  /**
   * Fetch all Users
   */
  describe('fetchUsers', () => {
    let user1: User = generateUser("1", "Jamsy");
    let user2: User = generateUser("2", "Jack");

    const users: User[] = [user1, user2];

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
  });

  /**
    * Remove single User
  */
  describe('deleteUser', () => {
    it('should successfully mock remove request', () => {
      const id = '1';
      service.deleteUser(id).subscribe((data) => {
        expect(data).toEqual(id);
      });
      const req = httpMock.expectOne(`http://localhost:1323/users/1`);
      expect(req.request.method).toEqual('DELETE');
    });
  })
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
