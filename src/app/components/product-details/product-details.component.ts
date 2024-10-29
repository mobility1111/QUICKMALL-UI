// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/Product'; // Change Medicine to Product
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service'; // Change MedicineService to ProductService


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  product!: Product; // Change Medicine to Product
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toast: NgToastService // Change MedicineService to ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id']; // Change medicineId to productId
      this.loadProductDetails(productId); // Change loadMedicineDetails to loadProductDetails
    });
  }

  loadProductDetails(productId: string): void { // Change medicineId to productId and method name
    this.productService.getProductById(productId).subscribe( // Change getMedicineById to getProductById
      (product: Product) => { // Change Medicine to Product
        this.product = product;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading product details:', error); // Adjust error message
        this.isLoading = false;
      }
    );
  }

  addToCart(product: Product): void {
    const userPayload = this.authService.decodedToken();
    if (userPayload && userPayload.UserId) {
      const userId: string = userPayload.UserId;
      const cartItem: CartItem = {
        cartItemId: '', 
        productId: product.id,
        quantity: 1,
        price: product.price,
        product: product
      };

      this.cartService.addToCart(cartItem, userId).subscribe({
        next: () => {
          this.toast.success({ detail: 'SUCCESS', summary: `Product "${product.name}" added to cart!`, duration: 5000 });
        },
        error: (error) => {
          this.toast.error({ detail: 'ERROR', summary: 'Failed to add product to cart. Please try again.', duration: 5000 });
        }
      });
    } else {
      this.toast.warning({ detail: 'WARNING', summary: 'User is not logged in or userId is null.', duration: 5000 });
    }
  }
}
