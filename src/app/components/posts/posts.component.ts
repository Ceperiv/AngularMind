import {Component, OnInit} from '@angular/core';
import {IPost, IUser} from "../../interfaces";
import {AuthService, PostService, RoleService, UserService} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: IPost[];
  user: IUser | null;
  isBlocked: boolean = true

  constructor(private postService: PostService,
              private roleService: RoleService,
              private authService: AuthService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.postService.getAll().subscribe((value) => {
      this.posts = value;
    });

    this.activatedRoute.data.pipe(
      map(value => value['data'] as IUser)
    ).subscribe((value) => {
      this.user = value;
      this.userService.setUser(value)
      this.roleService.getRole(value._id).subscribe(
        role => this.isBlocked = role.blocked);
    })
  };
}
