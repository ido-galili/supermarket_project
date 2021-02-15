import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  editProduct = {
    name: '',
    categoryId: '',
    price: 0,
    image: '',
  };

  constructor(
    public api: ApiService,
    public store: StoreService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async removeItemFromCart(cartItemId, itemPrice) {
    await this.api.deleteCartItem(cartItemId);

    const itemIndex = this.store.cart.items.map(item => item._id).indexOf(cartItemId);
    this.store.cart.items.splice(itemIndex, 1);

    this.store.cart.totalPrice = this.store.cart.totalPrice - itemPrice;

    window.localStorage.setItem('cart', JSON.stringify(this.store.cart));
  }

  removeAllItemsFromCart() {
    this.store.cart.items.forEach(item => {
      this.api.deleteCartItem(item._id);
    });

    this.store.cart.items = [];
    this.store.cart.totalPrice = 0;

    window.localStorage.setItem('cart', JSON.stringify(this.store.cart));
  }

  goToOrder() {
    if (this.store.cart.items.length === 0) {
      alert('Cart is empty');
    } else {
      this.router.navigate(['/order']);
    }
  }

  async saveProduct() {
    let response: any;

    if (this.store.edit) {
      response = await this.api.updateProduct(this.store.editProduct);
    } else {
      console.log("this.store.editProduct", this.store.editProduct)
      response = await this.api.createProduct(this.store.editProduct);
    }

    if (response.code === 'SUCCESS') {
      this.store.editProduct = {
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

      this.store.edit = false;
      this.store.new = false;
    } else {
      alert('Error. please try again');
    }
  }

  newForm(){
    this.store.new = true;

    this.store.editProduct = {
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

  }
}
