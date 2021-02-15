import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  datePickerMin: any;
  popupOpen = false;
  cartId: any;
  receiptReady = false;
  order = {
    customer: this.store.user._id,
    cart: this.store.cart._id,
    totalPrice: this.store.cart.totalPrice,
    creditCard: '',
    deliveryCity: '',
    deliveryAddress: '',
    deliveryDate: ''
  };

  error = false;
  title: string;
  message: string;

  constructor(
    public api: ApiService,
    public store: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.store.isLoggedIn) {
      this.router.navigate(['']);
    } else if (this.store.cart.items.length === 0) {
      this.router.navigate(['/main']);
    } else {
      const date = new Date();

      this.datePickerMin = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(this.datePickerMin);
    }
  }

  fillInput(inputId, value, orderKey) {
    console.log("orderKey", orderKey)
    const input: any = document.getElementById(inputId);
    input.value = value;
    this.order[orderKey] = value;
  }

  async orderCart() {
    console.log(this.order);
    this.error = false;

    const parseOrder = {
      ...this.order,
      creditCardLastDigits: this.order.creditCard.slice(-4),
      creditCard: ''
    };

    try {
      const response: any = await this.api.orderCart(parseOrder);


      if (response.code === 'SUCCESS') {
        this.cartId = this.store.cart._id;
        this.store.cart = {
          _id: null,
          items: [],
          totalPrice: 0
        };

        window.localStorage.removeItem('cart');
      } else {
        this.error = true;
        this.title = response.title;
        this.message = response.message;
      }

      this.popupOpen = true;

    } catch (error) {
      console.log(error);
    }


  }

  dismissPopup() {
    this.popupOpen = false;

    if (!this.error) {
      this.router.navigate(['']);
    }
  }

  async generateReceipt() {
    const response = await this.api.generateReceipt(this.cartId);

    if(response === 'SUCCESS') {
      this.receiptReady = true;
    }
  }

}
