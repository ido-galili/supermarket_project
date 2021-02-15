import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class StoreService {
  public categories: Array<any>;
  public cartOpen = false;
  public isLoggedIn = false;
  public authToken: string = null;
  public products = [];
  public user;
  public edit = false;
  public new = false;
  public productsCategories = [];
  public editProduct = {
    categoryId: '',
    categoryName: '',
    createdAt: '',
    image: '',
    name: '',
    price: 0,
    updatedAt: '',
    __v: 0,
    _id: '',
  };

  public cart = {
    _id: null,
    items: [],
    totalPrice: 0
  };

  public cities = [
    'Tel Aviv',
    'Beer Sheva',
    'Jerusalem',
    'Haifa',
    'Kiryat Shmona',
    'Ashdod',
    'Afula',
    'Eilat',
    'Haifa'
  ];

  constructor(public router: Router) { }

  toggleSideBar() {
    this.cartOpen = !this.cartOpen;
    this.edit = false;
    this.new = false;
  }

  signOut() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('cart');
    this.user = null;
    this.isLoggedIn = false;

    this.router.navigate(['']);

  }
}
