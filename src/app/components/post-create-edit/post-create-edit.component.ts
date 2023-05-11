import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PostFormComponent} from "../post-form/post-form.component";
import {IPost} from "../../interfaces";

@Component({
  selector: 'app-post-create-edit',
  template: ''


})
export class PostCreateEditComponent implements OnInit {

  @Input()
  postForEdit: IPost | [] = []

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.postForEdit) {
      this.dialog.open(PostFormComponent, {
          disableClose: true,
          enterAnimationDuration: '1s',
          exitAnimationDuration: '1s',
          hasBackdrop: true,
          data: {postForEdit: this.postForEdit}
        },
      )
    } else {
      this.dialog.open(PostFormComponent, {
          disableClose: true,
          enterAnimationDuration: '1s',
          exitAnimationDuration: '1s',
          hasBackdrop: true,
        },
      )
    }
  }
}
