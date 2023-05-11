import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {AuthService, PostService} from "../../services";
import Quill from "quill";
import {IPost} from "../../interfaces";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  form: FormGroup;
  error: string
  dialog: any
  editor: Quill;
  postForEdit: IPost
  description= new FormControl('');

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<PostFormComponent>,
              private postService: PostService,
              private router:Router,
              @Inject(MAT_DIALOG_DATA) public data: { postForEdit: IPost }) {
    this.postForEdit = this.data.postForEdit;
    this._initForm()
    this.dialog = this.dialogRef
  };

  ngOnInit(): void {
    if (this.postForEdit) {
      this.form = new FormGroup({
        postName: new FormControl(this.postForEdit.postName),
        author: new FormControl(this.postForEdit.author)
      })
      this.description = new FormControl(this.postForEdit.description)
    }

  };

  onEditorCreated(quill: Quill): void {
    const toolbar = quill.getModule('toolbar');
    this.editor = quill;
  };

  _initForm(): void {
    this.form = new FormGroup({
      postName: new FormControl('', [Validators.maxLength(25)]),
      author: new FormControl('', [Validators.maxLength(25)]),
    });
  };

  modules = {
    formula: true,
    toolbar: [
      [{header: [1, 2, false]}],
      ['bold', 'italic', 'underline'],
      ['formula'],
    ]
  };

  savePost():void {
    const newPost = {...this.form.value, description:this.editor.root.innerHTML};
    console.log(newPost)
    this.postService.updateById(this.postForEdit._id, newPost);
    this.router.navigate(['/posts'])
    this.dialogRef.close();
  };

  createPost() {
    const newPost = {...this.form.value, description:this.editor.root.innerHTML};
    this.postService.create(newPost);
    this.dialogRef.close();
    this.router.navigate(['/posts'])

  };

  cancel():void {
    this.dialogRef.close();
    this.router.navigate(['/posts'])
  };
}
