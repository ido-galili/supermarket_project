import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StoreService } from './../../services/store.service';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  alert = {
    error: false,
    title: '',
    message: ''
  };

  constructor(public api: ApiService, public store: StoreService, public router: Router) { }

  async login() {
    const response: any = await this.api.login(this.user);
    this.alert.error = false;

    if (response.code === 'SUCCESS') {
      this.alert.error = false;
      if (response.user.role === 1) {
        this.router.navigate(['/main']);
      }
    } else {
      this.alert.title = response.title;
      this.alert.message = response.message;
      this.alert.error = true;
    }
  }

  ngOnInit() { }
}
