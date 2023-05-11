import {AfterViewInit, Component, OnInit} from '@angular/core';

import {AuthService, UserService} from "../../services";
import {IRole, IUser} from "../../interfaces";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: IUser | null;
  role: IRole;

  constructor(public authService: AuthService,
              private userService: UserService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
  };

  ngOnInit(): void {
    this.userService.getActiveUser().subscribe(async value => {
      this.user = value;
      if (value !== null) {
        this.userService.getUserRole(value._id).subscribe(value => this.role = value)
      }
    })
  };

  ngAfterViewInit(): void {

    this.activatedRoute.url.subscribe(value => console.log(value))

}
}
