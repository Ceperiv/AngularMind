import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {IUser,} from "../../interfaces";
import {PostService} from "../post.service";
import {RoleService} from "../role.service";
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<IUser> {
  constructor(private postService: PostService,
              private roleService: RoleService,
              private authService: AuthService,
              private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {

    const user = this.authService.getUserStorage();
    return this.userService.getById(user._id)
  };
}
