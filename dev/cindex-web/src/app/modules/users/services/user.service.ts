import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  SERVER_URL = "http://localhost:1323";

  constructor(private http: HttpClient) {}

  /**
   * Create
   * @param user User
   */
  createUser(user: User): Observable<User> {
    const URL = `${this.SERVER_URL}/users`;
    return this.http.post<User>(URL, user);
  }

  /**
   * Fetch User By ID
   * @param id ID
   */
  fetchUser(id: string): Observable<User> {
    const URL = `${this.SERVER_URL}/users/${id}`;
    return this.http.get<User>(URL);
  }

  /**
   * Fetch All Users
   * @param offset Offset
   * @param limit Limit
   */
  fetchUsers(offset?: number, limit?: number): Observable<User[]> {
    const URL = `${this.SERVER_URL}/users`;
    /*
    let params = new HttpParams();
    params = offset ? params.set("offset", `${offset}`) : params;
    params = limit ? params.set("limit", `${limit}`) : params;
    */
    return this.http.get<User[]>(URL/*, { params }*/);
  }

  /**
   * Update User
   * @param user User
   */
  updateUser(user: Partial<User>) {
    const URL = `${this.SERVER_URL}/users/${user.id}`;
    return this.http.put<User>(URL, user);
  }

  /**
   * Remove User
   * @param id ID
   */
  removeUser(id: string) {
    const URL = `${this.SERVER_URL}/users/${id}`;
    return this.http.delete<void>(URL).pipe(map(() => id));
  }
}
