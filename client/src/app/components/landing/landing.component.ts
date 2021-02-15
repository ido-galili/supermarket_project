import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public api: ApiService, public store: StoreService) { }

  async ngOnInit() {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user) {
      this.store.user = user;
      this.store.isLoggedIn = true;
    }
  }

}
