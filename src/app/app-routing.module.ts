import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DealsComponent } from './components/deals/deals.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopComponent } from './components/shop/shop.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashborad', pathMatch: 'full' }, // Default route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'featured-products', component: FeaturedProductsComponent },
  // Add more routes as needed
  { path: '**', redirectTo: '/dasboard' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
