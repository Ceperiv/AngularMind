import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IRole, IUser} from "../interfaces";
import {urls} from "../configs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<IUser|null>(null)

  constructor(private httpClient: HttpClient) {
  };

  setUser(user:IUser): void {
    this._user.next(null)
    this._user.next(user)
  }

  removeUser(): void {
    this._user.next(null)
  }

  getActiveUser(): Observable<IUser|null> {
    return this._user.asObservable()
  }

  getUserRole(userId:string): Observable<IRole> {
    return this.httpClient.get<IRole>(urls.role.url + '/' + userId)
  };

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(urls.user.url);
  };

  getById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(urls.user.url + '/' + id);
  };

  getByToken(token: string): Observable<any> {
    return this.httpClient.get<IUser>(urls.user.byToken + '/' + token);
  };
}
