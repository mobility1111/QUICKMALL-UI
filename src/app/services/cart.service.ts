import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private baseApiUrl: string = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/carts`;

  constructor(private http: HttpClient, private authService: AuthService, private zone: NgZone) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      console.error('No token available.');
      return new HttpHeaders();
    }
  }

  getCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/getcartitems?userId=${userId}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(cartItems => {
          console.log('Cart items:', cartItems);
          this.cartItems = cartItems;
          this.updateCartItemsCount();
        })
      );
  }

  addToCart(cartItem: CartItem, userId: string): Observable<void> {
    const payload = {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        userId: userId
    };
    return this.http.post<void>(`${this.baseApiUrl}/api/carts/add`, payload)
        .pipe(
            tap(() => {
                this.cartItems.push(cartItem);
                this.updateCartItemsCount();
            }),
            catchError((error) => {
                console.error('Error adding to cart:', error);
                throw error;
            })
        );
}


  // addToCart(cartItem: CartItem, userId: string): Observable<void> {
  //   const payload = {
  //     productId: cartItem.productId,
  //     quantity: cartItem.quantity,
  //     userId: userId
  //   };
  //   return this.http.post<any>(`${this.baseApiUrl}/api/carts/add?productId=${payload.productId}&quantity=${payload.quantity}&userId=${payload.userId}`, payload)
  //     .pipe(
  //       tap(() => {
  //         this.cartItems.push(cartItem);
  //         this.updateCartItemsCount();
  //       }),
  //       catchError((error) => {
  //         console.error('Error adding to cart:', error);
  //         throw error;
  //       })
  //     );
  // }


  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/updateCartItem`, cartItem, { headers: this.getAuthHeaders() });
  }

  removeCartItem(cartItemId: string): Observable<any> {
    const url = `${this.apiUrl}/removecartitem/${cartItemId}`;
    console.log('Removing cart item with ID:', cartItemId);
    return this.http.delete<any>(url, { headers: this.getAuthHeaders() });
  }

  clearCart(userId: string): Observable<any> {
    const url = `${this.apiUrl}/clearcart/${userId}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() }).pipe(
      tap(
        () => {
          console.log('Cart cleared successfully.');
          this.cartItems = [];
          this.updateCartItemsCount();
        },
        (error) => console.error('Error clearing cart:', error)
      ),
      catchError((error) => {
        console.error('Error clearing cart:', error);
        throw error;
      })
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/Markets/GetAllProducts`);
  }

  getCartItemsCount(): Observable<number> {
    return this.cartItemsCountSubject.asObservable();
  }

  public updateCartItemsCount(): void {
    const totalCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartItemsCountSubject.next(totalCount);
    this.zone.run(() => {}); // Run change detection within Angular zone
  }
}
