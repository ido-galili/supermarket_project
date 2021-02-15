import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  credentials = {
    idNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  user = {
    idNumber: '',
    email: '',
    password: '',
    city: '',
    street: '',
    firstName: '',
    lastName: ''
  };

  credentialsAlert = {
    error: false,
    title: '',
    message: ''
  };

  signupAlert = {
    error: false,
    title: '',
    message: ''
  };

  loginAlert = {
    error: false,
    title: '',
    message: ''
  };

  showSignUp = false;

  constructor(
    public api: ApiService,
    public store: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.store.isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  async checkCredentials() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.credentialsAlert.error = true;
      this.credentialsAlert.title = 'Passwords are no identical';
      this.credentialsAlert.message = 'Please type them again to continue';
    } else {
      const response: any = await this.api.checkCredentials(this.credentials);
      this.credentialsAlert.error = false;

      if (response.code === 'SUCCESS') {
        this.showSignUp = true;
        this.user.idNumber = this.credentials.idNumber;
        this.user.email = this.credentials.email;
        this.user.password = this.credentials.password;
        this.credentialsAlert.error = false;
      } else {
        this.credentialsAlert.title = response.title;
        this.credentialsAlert.message = response.message;
        this.credentialsAlert.error = true;
      }
    }
  }

  async signup() {
    const response: any = await this.api.signup(this.user);
    this.signupAlert.error = false;

    if (response.code === 'SUCCESS') {
      const loginCredentials = {
        email: this.user.email,
        password: this.user.password
      };

      const loginResponse: any = await this.api.login(loginCredentials);

      if (loginResponse.code === 'SUCCESS') {
        this.store.isLoggedIn = true;
        this.store.user = loginResponse.user;
        this.loginAlert.error = false;
        this.router.navigate(['']);
      } else {
        this.loginAlert.title = loginResponse.title;
        this.loginAlert.message = loginResponse.message;
        this.loginAlert.error = true;
      }
    } else {
      this.signupAlert.title = response.title;
      this.signupAlert.message = response.message;
      this.signupAlert.error = true;
    }
  }
}
