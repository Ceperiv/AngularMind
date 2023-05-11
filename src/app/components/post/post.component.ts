import {Component, Input, OnInit} from '@angular/core';

import {IPost} from "../../interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  @Input()
  post: IPost;

  @Input()
  isBlocked: boolean = true

  isEdit: boolean = false

  panelOpenState: boolean = false;

  constructor() {
  };

  ngOnInit(): void {

  };

  editPost() {
    this.isEdit = true;
    setTimeout(() => {
      this.isEdit = false;
    }, 5000);
  }
}
