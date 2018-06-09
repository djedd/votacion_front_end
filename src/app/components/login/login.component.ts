import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  pageTitle = 'Inicio de Sesión';
  user: IUser;
  userName: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {

      this.userName = loginForm.form.value.userName;
      this.password = loginForm.form.value.password;
      this.user = {
        'identificacion': this.userName,
        'contrasena': this.password,
        'isAdmin': false
      };
      this.authService.doLogin(this.user);

      if (this.authService.logged) {
        // this.router.navigate(['/main']);
        // this.router.navigateByUrl(this.authService.redirectUrl);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

}
