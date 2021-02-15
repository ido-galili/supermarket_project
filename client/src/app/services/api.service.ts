import { StoreService } from './store.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiAuthEndpoint = 'http://localhost:5000/api/auth';
  private apiStoreEndpoint = 'http://localhost:5000/api/store';
  public headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
  constructor(public http: HttpClient, public store: StoreService) { }

  // Authentication
  login(credentials) {
    return this.http.post(`${this.apiAuthEndpoint}/login`, credentials, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/login response', response);
        if (response.code === 'SUCCESS') {
          this.store.isLoggedIn = true;
          const user = response.user;
          const { email, city, firstName, lastName, street, role, idNumber, _id } = user;
          const saveToLocalUser = {
            email,
            city,
            firstName,
            lastName,
            street,
            role,
            idNumber,
            _id
          };

          window.localStorage.setItem('user', JSON.stringify(saveToLocalUser));
          this.store.user = response.user;
        }
        return response;
      })
      .catch(error => {
        console.log('/login error', error);
        return error.error;
      });
  }

  checkCredentials(credentials) {
    return this.http.post(`${this.apiAuthEndpoint}/check-credentials`, credentials, { headers: this.headers }).toPromise()
      .then(response => {
        console.log('/checkCredentials response', response);
        return response;
      })
      .catch(error => {
        console.log('/checkCredentials error', error);
        return error.error;
      });
  }

  signup(user) {
    return this.http.post(`${this.apiAuthEndpoint}/register`, user, { headers: this.headers }).toPromise()
      .then(response => {
        console.log('/signup response', response);
        return response;
      })
      .catch(error => {
        console.log('/signup error', error);
        return error.error;
      });
  }

  checkToken() {
    return this.http.get(`${this.apiAuthEndpoint}/checkToken
  `, { headers: this.headers }).toPromise()
      .then(response => {
        console.log('/checkToken response', response);
        return response;
      })
      .catch(error => {
        console.log('/checkToken error', error);
        return error.error;
      });
  }

  // Store
  getProductsByCategory(categoryId) {
    return this.http.get(`${this.apiStoreEndpoint}/productsByCategory/${categoryId}`, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/getProductsByCategory response', response);
        if (response.code === 'SUCCESS') {
          return response.items;
        }

        throw (response);
      })
      .catch(error => {
        console.log('/getProductsByCategory error', error);
        return error.error;
      });
  }

  getCategories() {
    return this.http.get(`${this.apiStoreEndpoint}/categories`, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/getCategories response', response);
        if (response.code === 'SUCCESS') {
          return response.items;
        }

        throw (response);

      })
      .catch(error => {
        console.log('/getCategories error', error);
        return error.error;
      });
  }

  getOrdersTotal() {
    return this.http.get(`${this.apiStoreEndpoint}/total_orders`, { headers: this.headers }).toPromise()
      .then(response => {
        console.log('/getOrdersTotal response', response);
        return response;
      })
      .catch(error => {
        console.log('/getOrdersTotal error', error);
        return error.error;
      });
  }

  getProductsTotal() {
    return this.http.get(`${this.apiStoreEndpoint}/total_products
  `, { headers: this.headers }).toPromise()
      .then(response => {
        console.log('/getProductsTotal response', response);
        return response;
      })
      .catch(error => {
        console.log('/getProductsTotal error', error);
        return error.error || 'Server Error';
      });
  }

  searchProducts(searchQuery) {
    return this.http.get(`${this.apiStoreEndpoint}/search?phrase=${searchQuery}
  `, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/searchProducts response', response);
        if (response.code === 'SUCCESS') {
          return response.items;
        }


      })
      .catch(error => {
        console.log('/searchProducts error', error);
        return error.error || 'Server Error';
      });
  }

  createCart() {
    const cart = {
      customerId: this.store.user._id
    };

    return this.http.post(`${this.apiStoreEndpoint}/carts`, cart, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/createCart response', response);

        if (response.code === 'SUCCESS') {
          return response.item;
        }

        throw (response);
      })
      .catch(error => {
        console.log('/createCart error', error);
        return error.error;
      });
  }

  createCartItem(item) {
    return this.http.post(`${this.apiStoreEndpoint}/cart-items`, item, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/createCartItem response', response);

        if (response.code === 'SUCCESS') {
          return response.item;
        }

        throw (response);
      })
      .catch(error => {
        console.log('/createCartItem error', error);
        return error.error;
      });
  }

  deleteCartItem(itemId) {
    return this.http.delete(`${this.apiStoreEndpoint}/cart-items/${itemId}`, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/deleteCartItem response', response);

        if (response.code === 'SUCCESS') {
          return response.item;
        }

        throw (response);
      })
      .catch(error => {
        console.log('/deleteCartItem error', error);
        return error.error;
      });
  }

  orderCart(order) {
    return this.http.post(`${this.apiStoreEndpoint}/orders`, order, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/orderCart response', response);

        return response;
      })
      .catch(error => {
        console.log('/orderCart error', error);
        return error.error;
      });
  }

  generateReceipt(cartId) {
    return this.http.get(`${this.apiStoreEndpoint}/order_receipt/${cartId}`, {}).toPromise()
      .then((response: any) => {
        console.log('/getReceipt response', response);

        return response;
      })
      .catch(error => {
        console.log('/getReceipt error', error);
        return error.error;
      });
  }

  updateProduct(product) {
    console.log("updateProduct", product)
    return this.http.put(`${this.apiStoreEndpoint}/products/${product._id}`, product, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/updateProduct response', response);

        return response;
      })
      .catch(error => {
        console.log('/updateProduct error', error);
        return error.error;
      });
  }

  createProduct(product) {
    return this.http.post(`${this.apiStoreEndpoint}/products`, product, { headers: this.headers }).toPromise()
      .then((response: any) => {
        console.log('/createProduct response', response);

        return response;
      })
      .catch(error => {
        console.log('/createProduct error', error);
        return error.error;
      });
  }
}
