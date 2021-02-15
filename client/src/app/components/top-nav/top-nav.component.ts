import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(public store: StoreService, public router: Router, public api: ApiService) { }

  async ngOnInit() {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user) {
      this.store.user = user;
      this.store.isLoggedIn = true;

      console.log("this", this.router.url)

      if (user.role === 1) {
        this.router.navigate(['/main']);
      }

      const savedCart = window.localStorage.getItem('cart');

      if (savedCart) {
        this.store.cart = JSON.parse(savedCart);
      } else {
        const generateCart: any = await this.api.createCart();
        this.store.cart._id = generateCart._id;
        window.localStorage.setItem('cart', JSON.stringify(this.store.cart));
      }
    }
  }

}
