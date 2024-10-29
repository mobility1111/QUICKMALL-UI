import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = [];
  products: Product[] = [];
  categoryId!: string;

  // Pagination properties
  pageSize: number = 2; // Number of products per page
  currentPage: number = 1; // Current page number
  totalItems: number = 0; // Total number of products

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];

      this.productService.getProductsByCategory(this.categoryId).subscribe(result => {
        this.products = result;
      });
    });
  }

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe(
      (products) => {
        this.featuredProducts = products;
        this.totalItems = this.featuredProducts.length; // Set the total items
      },
      (error) => {
        console.error('Error fetching featured products:', error);
      }
    );
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.featuredProducts.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  addToCart(product: Product): void {
    const userPayload = this.authService.decodedToken();
    console.log('User Payload:', userPayload);
  
    if (userPayload && userPayload.UserId) {
      const userId: string = userPayload.UserId;
      console.log('User ID:', userId);
  
      const cartItem: CartItem = {
        cartItemId: '', // Leave it as an empty string to be handled by the backend
        productId: product.id,
        quantity: 1, // You can adjust this based on your UI or user input
        price: product.price,
        product: product
      };
      console.log('Cart Item:', cartItem);
  
      this.cartService.addToCart(cartItem, userId).subscribe({
        next: () => {
          console.log('Product added to cart successfully.');
          this.toast.success({ detail: 'SUCCESS', summary: `Product "${product.name}" added to cart!`, duration: 5000 });
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
          this.toast.error({ detail: 'ERROR', summary: 'Failed to add product to cart. Please try again.', duration: 5000 });
          // Handle errors here if needed
        }
      });
    } else {
      console.error('User is not logged in or userId is null.');
      this.toast.warning({ detail: 'WARNING', summary: 'User is not logged in or userId is null.', duration: 5000 });
      // Handle this case based on your application's logic
    }
  }

}
