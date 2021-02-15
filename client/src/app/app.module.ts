import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Containers
import { TopNavComponent } from './components/top-nav/top-nav.component';

// Routes
import { MainComponent } from './components/main/main.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrderComponent } from './components/order/order.component';

// Comps
import { LoginComponent } from './components/login/login.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { StoreDescriptionComponent } from './components/store-description/store-description.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesNavComponent } from './components/categories-nav/categories-nav.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    StoreDetailsComponent,
    StoreDescriptionComponent,
    CartComponent,
    ProductsComponent,
    CategoriesNavComponent,
    OrderComponent,
    MainComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
