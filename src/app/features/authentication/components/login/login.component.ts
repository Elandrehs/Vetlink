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

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form:FormGroup;
  loading:boolean=false;

  constructor(private fb:FormBuilder,private router:Router,private _snackBar:MatSnackBar, private userService: UserService ) {
  this.form = fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  })
  }
  access(){
    console.log(this.form.value.email,this.form.value.password);
    console.log(this.form.status);
    const { email, password } = this.form.value;
    this.userService.getAll().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        this.loading = true;
        localStorage.setItem('loggedUser', JSON.stringify(user));
        setTimeout(() => {
          this.router.navigateByUrl('/principal');
        }, 2000);
      } else {
        this.error();
      }
    });
  }
  error(){
    this._snackBar.open('Credenciales_Incorrectas','',{
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
