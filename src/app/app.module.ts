import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DealsComponent } from './components/deals/deals.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { PaymentTransactionsComponent } from './components/payment-transactions/payment-transactions.component';
import { NgToastModule } from 'ng-angular-popup';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FaqComponent } from './components/faq/faq.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ReactivationEmailComponent } from './components/reactivation-email/reactivation-email.component';
import { ResetComponent } from './components/reset/reset.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BottomNavComponent,
    DashboardComponent,
    HeaderComponent,
    AboutUsComponent,
    MyOrdersComponent,
    CartComponent,
    ShopComponent,
    ContactUsComponent,
    DealsComponent,
    ProfileComponent,
    LoginComponent,
    ProductsComponent,
    ImageDisplayComponent,
    ProductDetailsComponent,
    FeaturedProductsComponent,
    PaymentTransactionsComponent,
    ConfirmationComponent,
    FaqComponent,
    AddProductComponent,
    AddCategoryComponent,
    OrderDetailComponent,
    ProductCategoryComponent,
    NotFoundComponent,
    PaymentFormComponent,
    ReactivationEmailComponent,
    ResetComponent,
    AdminComponent,
    SignupComponent,
    CarouselComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // For formGroup and form handling
    HttpClientModule,     // For HttpClient
    NgToastModule,        // For toast notifications
    FormsModule,          // For template-driven forms if necessary
    RouterModule,
    CommonModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
