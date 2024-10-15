import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/Product'; // Updated import
import { ProductCategory } from 'src/app/models/ProductCategory';
import { CartItem } from 'src/app/models/cart.model';


import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service'; // Updated import

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = []; // Updated type
  productCategories: ProductCategory[] = []; // Updated type
  searchValue: string = '';
  productId!: string; // Updated variable

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService, // Updated service injection
    private cartService: CartService,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['query'] || '';
      this.loadProducts();
      if (this.searchValue) {
        this.loadProductCategories(); // Load categories only if search query is present
      } else {
        this.productCategories = []; // Clear categories if no search query
      }
    });
  }

  loadProducts() {
    if (this.searchValue) {
      this.productService.getAllProducts(this.searchValue).subscribe({ // Updated method call
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching products', error);
        }
      });
    } else {
      this.products = [];
    }
  }

  loadProductCategories() {
    this.productService.getAllProductCategories().subscribe({ // Updated method call
      next: (data) => {
        this.productCategories = this.filterCategories(this.searchValue, data); // Filter categories based on search value
      },
      error: (error) => {
        console.error('Error fetching product categories', error);
      }
    });
  }

  onSearchChange() {
    this.loadProducts();
    if (this.searchValue) {
      this.loadProductCategories(); // Load categories only if search query is present
    } else {
      this.productCategories = []; // Clear categories if search query is empty
    }
  }

  // Function to filter categories based on search value
  filterCategories(searchValue: string, categories: ProductCategory[]): ProductCategory[] { // Updated type
    if (!searchValue) {
      return categories; // Return all categories if search value is empty
    }
    searchValue = searchValue.toLowerCase();
    return categories.filter(category => category.name.toLowerCase().includes(searchValue));
  }

  addToCart(product: Product): void { // Updated parameter type
    const userPayload = this.authService.decodedToken();
  
    if (userPayload && userPayload.UserId) {
      const userId: string = userPayload.UserId;
  
      const cartItem: CartItem = {
        cartItemId: '', // Leave it as an empty string to be handled by the backend
        productId: product.id, // Updated to productId
        quantity: 1, // You can adjust this based on your UI or user input
        price: product.price, // Updated to product price
        product: product // Updated to product
      };
  
      this.cartService.addToCart(cartItem, userId).subscribe({
        next: () => {
          this.toast.success(`Product "${product.name}" added to cart!`, 'SUCCESS', 5000);
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
          this.toast.danger('Failed to add product to cart. Please try again.');
        }
      });
    } else {
      console.error('User is not logged in or userId is null.');
      this.toast.warning('User is not logged in or userId is null.', 'WARNING', 5000);
    }
  }
}
