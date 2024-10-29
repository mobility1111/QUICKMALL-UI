import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent {

  cartItemsCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Assuming you want to initialize the cart count when the header component is loaded
    this.updateCartCount();

    // Subscribe to changes in the cart count
    this.cartItemsCount$ = this.cartService.getCartItemsCount();
  }

  // Function to update the cart count
  updateCartCount(): void {
    this.cartService.updateCartItemsCount();
  }

}
