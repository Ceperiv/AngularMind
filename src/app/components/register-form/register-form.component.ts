import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {AuthService} from "../../services";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form: FormGroup;
  error: string
  dialog:any

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<RegisterFormComponent>,
              private router: Router) {
    this._initForm()
    this.dialog = this.dialogRef
  };

  _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  };

  register() {
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.error = e.error.message;
        console.log(e);
      }
    });
  };
}
