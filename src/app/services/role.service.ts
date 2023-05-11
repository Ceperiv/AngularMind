import {Injectable} from '@angular/core';
import {IRole} from "../interfaces";
import {urls} from "../configs";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private httpClient: HttpClient) {
  }

  getRole(id: string): Observable<IRole> {
    return this.httpClient.get<IRole>(urls.role.url + '/' + id)
  }
}
