
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = []; // Holds products for the current page
  loading = true;

  pageSize: number = 3; // Number of items per page
  currentPage: number = 1; // Current page number
  totalItems: number = 0; // Total number of products
  totalPages: number = 0; // Total number of pages

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.getProductsByCategory(categoryId);
      } else {
        this.getAllProducts();
      }
    });
  }

  // Fetch all products
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.totalItems = this.products.length; // Set the total number of products
      this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Calculate total pages
      this.loading = false;
      this.paginateProducts(); // Paginate after loading all products
    });
  }

  // Fetch products by category
  getProductsByCategory(categoryId: string): void {
    this.productService.getProductsByCategory(categoryId).subscribe((products) => {
      this.products = products;
      this.totalItems = this.products.length; // Set the total number of products
      this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Calculate total pages
      this.loading = false;
      this.paginateProducts(); // Paginate after loading products
    });
  }

  // Paginate the products based on the current page
  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  // Set the current page and paginate again
  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateProducts();
    }
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  // Helper method for rendering pagination numbers
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  // Add product to cart
  addToCart(product: Product): void {
    const userPayload = this.authService.decodedToken();
    console.log('User Payload:', userPayload);
  
    if (userPayload && userPayload.UserId) {
      const userId: string = userPayload.UserId;
      console.log('User ID:', userId);
  
      const cartItem: CartItem = {
        cartItemId: '', // Leave it as an empty string to be handled by the backend
        productId: product.id,
        quantity: 1, // Adjust quantity as per user input or default value
        price: product.price,
        product: product
      };
      console.log('Cart Item:', cartItem);
  
      this.cartService.addToCart(cartItem, userId).subscribe({
        next: () => {
          console.log('Product added to cart successfully.');
          // Correct use of the toast service
          this.toast.success(`Product "${product.name}" added to cart!`, 'SUCCESS', 5000);
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
          // Correct use of the toast service
          this.toast.danger('Failed to add product to cart. Please try again.');
        }
      });
    } else {
      console.error('User is not logged in or userId is null.');
      // Correct use of the toast service
      this.toast.warning('User is not logged in or userId is null.', 'WARNING', 5000);
    }
  }
  
}









// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products = [];  // This will hold all products
//   paginatedProducts = [];  // This will hold products for the current page
//   currentPage = 1;
//   itemsPerPage = 12;
//   totalPages!: number;

//   ngOnInit(): void {
//     this.loadProducts();
//     this.paginateProducts();
//   }

//   loadProducts(): void {
//     // Fetch products from backend or hardcode them for now
//     this.products = [
//       // { id: 1, title: 'Product 1', price: 1500, imageUrl: 'assets/images/product1.jpg' },
//       // { id: 2, title: 'Product 2', price: 2500, imageUrl: 'assets/images/product2.jpg' },
//       // Add more products here...
//     ];
//     this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
//   }

//   paginateProducts(): void {
//     const start = (this.currentPage - 1) * this.itemsPerPage;
//     const end = start + this.itemsPerPage;
//     this.paginatedProducts = this.products.slice(start, end);
//   }

//   setPage(page: number): void {
//     this.currentPage = page;
//     this.paginateProducts();
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.paginateProducts();
//     }
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.paginateProducts();
//     }
//   }

//   get totalPagesArray(): number[] {
//     return Array(this.totalPages).fill(0).map((x, i) => i + 1);
//   }
// }
