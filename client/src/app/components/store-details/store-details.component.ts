import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})

export class StoreDetailsComponent implements OnInit {
  ordersSum: number = null;
  productsSum: number = null;

  constructor(public api: ApiService) { }

  async ngOnInit() {
    const ordersResponse: any = await this.api.getOrdersTotal();
    const productsResponse: any = await this.api.getProductsTotal();

    if (ordersResponse.code === 'SUCCESS') {
      this.ordersSum = ordersResponse.count;
    }

    if (productsResponse.code === 'SUCCESS') {
      this.productsSum = productsResponse.count;
    }
  }

}
