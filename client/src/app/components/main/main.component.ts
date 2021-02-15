import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Array<any>;
  activeCategory: string;
  searchQuery: string;
  isModalOpen = false;
  selectedProduct: any;
  productQuantity: number;
  isAdmin = this.store.user.role === 1;
  cart: Array<any>;
  product: any;

  constructor(
    public api: ApiService,
    public store: StoreService,
    private router: Router
  ) { }

  async ngOnInit() {
    if (!this.store.isLoggedIn) {
      this.router.navigate(['']);
    } else {
      this.store.categories = await this.api.getCategories();

      if (this.store.categories && this.store.categories[0]) {
        this.getProductsByCategory(this.store.categories[0]._id);
      }

      if (!this.isAdmin) {
        const savedCart = window.localStorage.getItem('cart');

        if (savedCart) {
          this.store.cart = JSON.parse(savedCart);
        } else {
          const generateCart: any = await this.api.createCart();
          this.store.cart._id = generateCart._id;
          window.localStorage.setItem('cart', JSON.stringify(this.store.cart));
        }
      }

      this.store.cartOpen = true;
    }
  }

  async getProductsByCategory(categoryId) {
    console.log('categoryId', categoryId);
    this.activeCategory = categoryId;

    this.products = await this.api.getProductsByCategory(categoryId);
  }

  showModal(product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  dismissModal() {
    this.isModalOpen = false;
  }

  async searchProducts() {
    this.products = await this.api.searchProducts(this.searchQuery);
  }

  async addToCart() {
    if (!this.productQuantity || this.productQuantity < 1) {
      alert('Please choose product quantity');
      return;
    }

    this.isModalOpen = false;

    const product = this.selectedProduct;
    const quantity = this.productQuantity;

    const item = {
      name: product.name,
      cart: this.store.cart._id,
      product: product._id,
      quantity,
      totalPrice: product.price * quantity,
    };

    const cartItem = await this.api.createCartItem(item);

    const localCartItem = {
      ...product,
      ...cartItem,
    };

    this.store.cart.items.push(localCartItem);
    this.store.cart.totalPrice = this.store.cart.totalPrice + item.totalPrice;

    window.localStorage.setItem('cart', JSON.stringify(this.store.cart));
  }

  editProduct(product){
    const productCategoryIndex: any = this.store.categories.map(category => category._id).indexOf(product.categoryId);
    const categoryName: any = this.store.categories[productCategoryIndex].name;
    this.store.editProduct = {
      ...product,
      categoryName
    };

    this.store.edit = true;

    console.log(this.store.editProduct);

    if (!this.store.cartOpen) {
      this.store.toggleSideBar();
    }
  }

  createProduct(){

  }
}
