

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotalPrice: number = 0;

  constructor(private cartService: CartService, private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }
  
 
  loadCartItems(): void {
    const userId = this.authService.getUserIdFromToken();
    
    if (userId) {
      this.cartService.getCartItems(userId).subscribe({
        next: (cartItems) => {
          console.log('Cart items loaded successfully:', cartItems);
  
          // Log each cart item individually to inspect product details
          cartItems.forEach((item, index) => {
            console.log(`Cart Item ${index + 1}:`, item);
            console.log(`Product in Cart Item ${index + 1}:`, item.product); // Check for product details
          });
  
          this.cartItems = cartItems;
          this.cartTotalPrice = this.calculateCartTotalPrice();
        },
        error: (error) => {
          console.error('Error loading cart items:', error);
        }
      });
    } else {
      console.warn('User ID is not available.');
    }
  }
  
  

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.updateCartItem(item);
  }

  updateCartItem(item: CartItem): void {
    this.cartService.updateCartItem(item).subscribe(() => {
      this.cartTotalPrice = this.calculateCartTotalPrice();
    });
  }

  removeCartItem(item: CartItem) {
    console.log('Removing cart item with ID:', item.cartItemId);  // Added console log
    this.cartService.removeCartItem(item.cartItemId).subscribe({
      next: (res: any) => {
        console.log('Cart item removed successfully.');
        this.loadCartItems();
      },
      error: (error) => {
        console.error('Error removing cart item:', error);
      }
    });
  }
  
  clearCart(): void {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID is null. Unable to clear the cart.');
      return;
    }
  
    this.cartService.clearCart(userId).subscribe({
      next: () => {
        alert('Cart cleared successfully.');
        // Success case
        //console.log('Cart cleared successfully.');
        this.cartItems = [];
        this.cartTotalPrice = 0;
        this.cartService.updateCartItemsCount();
        // Manually trigger change detection
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    });
  }

  calculateCartTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  
  proceedToCheckout(): void {
    const totalPrice = this.calculateCartTotalPrice();
    this.router.navigate(['/payment-form'], { queryParams: { totalPrice: totalPrice, paymentType: 'product' } });
  } 
}










// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent {
//   cartItems = [
//     {
//       productName: 'Samsung Galaxy S21',
//       quantity: 1,
//       price: 250000,
//       subtotal: 250000
//     },
//     {
//       productName: 'Apple MacBook Pro',
//       quantity: 1,
//       price: 950000,
//       subtotal: 950000
//     }
//   ];

//   updateSubtotal(item: any) {
//     item.subtotal = item.quantity * item.price;
//   }

//   getTotalItems() {
//     return this.cartItems.reduce((total, item) => total + item.quantity, 0);
//   }

//   getTotalAmount() {
//     return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
//   }

//   removeFromCart(item: any) {
//     const index = this.cartItems.indexOf(item);
//     if (index > -1) {
//       this.cartItems.splice(index, 1);
//     }
//   }

//   proceedToCheckout() {
//     // Logic to proceed to the checkout page
//     console.log('Proceeding to checkout');
//   }
// }
