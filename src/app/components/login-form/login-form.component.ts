import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {AuthService, UserService} from "../../services";
import {Dialog, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  form: FormGroup;
  error: string;
  dialog:any

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<LoginFormComponent>,
              private router: Router,
              private userService: UserService) {
    this._initForm();
    this.dialog = this.dialogRef
  }

  _initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  };

  login(): void {
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/posts']);
      },
      error: (e) => {
        this.error = e.error.message;
        console.log(e);
      }
    });
  };
}
