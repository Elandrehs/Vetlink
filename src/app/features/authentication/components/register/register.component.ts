import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {TranslatePipe} from '@ngx-translate/core';
import {User} from '../../models/user.entity';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form:FormGroup;
  loading:boolean=false;

  constructor(private fb:FormBuilder,private router:Router,private _snackBar:MatSnackBar, private userService: UserService ) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  register() {
    console.log('Usuario registrado:', this.form.value);

    if (this.form.invalid) return;

    const { name, email, password } = this.form.value;

    this.loading = true;
    this.userService.create(new User({ name, email, password })).subscribe({

      next: () => {
        this._snackBar.open('Registro exitoso', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.router.navigateByUrl('/authentication');
      },
      error: () => {
        this.loading = false;
        this._snackBar.open('Error al registrar', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
