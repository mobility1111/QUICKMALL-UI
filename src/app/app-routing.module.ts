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
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ResetComponent } from './components/reset/reset.component';
import { ReactivationEmailComponent } from './components/reactivation-email/reactivation-email.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FaqComponent } from './components/faq/faq.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentTransactionsComponent } from './components/payment-transactions/payment-transactions.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'products/category/:categoryId', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'featured-products', component: FeaturedProductsComponent },
  { path: 'category', component: ProductCategoryComponent},
  { path: 'add-product', component: AddProductComponent,canActivate:[RoleGuard]},
  { path: 'add-category', component: AddCategoryComponent,canActivate:[RoleGuard]},
  {path: 'cart', component:CartComponent,  canActivate:[AuthGuard]},
  { path: 'faq', component: FaqComponent},
  { path: 'payment-form', component: PaymentFormComponent},
  { path: 'payments', component: PaymentTransactionsComponent, canActivate:[RoleGuard]},
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'orders', component: MyOrdersComponent, canActivate:[RoleGuard] },
  { path: 'user-orders', component: MyOrdersComponent, canActivate:[AuthGuard]},
  { path: 'order/:orderId', component: OrderDetailComponent },
  //{ path: 'track/:orderId', component: OrderTrackingComponent},
  {path:'resetss', component: ResetComponent},
  { path: 'confirm-email', component: ConfirmationComponent },
  { path: 'reactivate', component: ReactivationEmailComponent },
  // Add more routes as needed
  { path: '**', redirectTo: '/dasboard' },
  {path:'not-found', component: NotFoundComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
