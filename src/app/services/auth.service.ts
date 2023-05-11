import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, ITokens, IUser} from "../interfaces";
import {urls} from "../configs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessTokenKey: string = 'access';
  private readonly _refreshTokenKey: string = 'refresh';
  private readonly _userKey: string = 'user';
  private _authUserEmail = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  };

  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
      tap((tokens) => {
        this.userService.setUser(tokens.user)
        this._setTokens(tokens);
        this._authUserEmail.next(user.email)
      })
    )
  };

  logout():void {
    const access_token = this.getAccessToken();
    const headers = new HttpHeaders().set('Authorization', access_token);
    this.httpClient.post(urls.auth.logout, {}, {headers: headers}).subscribe({
      next: () => {
        this.deleteTokens()
        console.log('logout done')
        location.reload()
      }, error: (e) => console.log(e)
    })
  }

  refresh(refresh: string): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap((tokens) =>
        this._setTokens(tokens)
      )
    )
  }

  register(user: IAuth): Observable<IAuth> {
    return this.httpClient.post<IAuth>(urls.auth.signup, user)
  }


  getUserEmail(): Observable<string | null> {
    return this._authUserEmail.asObservable()
  }

  private _setTokens({access_token, refresh_token, user}: ITokens): void {
    localStorage.setItem(this._userKey, JSON.stringify(user))
    localStorage.setItem(this._accessTokenKey, access_token)
    localStorage.setItem(this._refreshTokenKey, refresh_token)
  };

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || ''
  };

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || ''
  };

  getUserStorage(): IUser {
    return JSON.parse(localStorage.getItem(this._userKey) || '') || ''
  };

  deleteTokens(): void {
    localStorage.removeItem(this._refreshTokenKey)
    localStorage.removeItem(this._accessTokenKey)
    localStorage.removeItem(this._userKey)
    this._authUserEmail.next(null)
  };

}
