import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  loading = true;

  pageSize: number = 3;
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;

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

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.loading = false;
        this.paginateProducts();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch products. Please try again later.', duration: 5000 });
      }
    });
  }

  getProductsByCategory(categoryId: string): void {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (products) => {
        this.products = products;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.loading = false;
        this.paginateProducts();
      },
      error: (err) => {
        console.error('Error fetching products by category:', err);
        this.loading = false;
        this.toast.error({ detail: 'ERROR', summary: 'Failed to fetch products by category. Please try again later.', duration: 5000 });
      }
    });
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
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
