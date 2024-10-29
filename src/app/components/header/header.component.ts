import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartItemsCount$!: Observable<number>;
  categories: ProductCategory[] = [];
  searchValue: string = '';
  public users:any = [];
  public fullName : string = "";
  public role!:string;
  public loggedIn = false;

  constructor(private productService: ProductService, 
    private api: ApiService, private auth: AuthService, private userStore: UserStoreService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAllProductCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
   });

   this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    this.updateCartCount();

    // Subscribe to changes in the cart count
    this.cartItemsCount$ = this.cartService.getCartItemsCount();
  } 

  updateCartCount(): void {
    this.cartService.updateCartItemsCount();
  }

  logout(){
    this.auth.logout();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
