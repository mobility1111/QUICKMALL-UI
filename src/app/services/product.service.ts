import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  // Get all products
  // getAllProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.baseApiUrl}/api/product-categories`);
  // }

  getAllProducts(search?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search); // Add search to the params
    }
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/product/GetAllProducts`, { params });
  }
  // Get products by category
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/product/category/${categoryId}`);

  }

  // Get featured products
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/product/featuredProducts`);
  }
  

  // Get product by ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseApiUrl}/api/product/product/${productId}`);
}


  // Get all product categories
  getAllProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.baseApiUrl}/api/product-categories`);
  }

  // Get category with products
  getCategoryWithProducts(id: string): Observable<{ category: ProductCategory, products: Product[] }> {
    return this.http.get<{ category: ProductCategory, products: Product[] }>(`${this.baseApiUrl}/api/product-categories/category-with-products/${id}`);
  }

  // Get all products with optional search
  getAllProductsWithSearch(search?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/product/GetAllProducts`, { params });
  }

  // Search products
  searchProducts(searchValue: string): Observable<Product[]> {
    let params = new HttpParams();
    if (searchValue) {
      params = params.set('search', searchValue);
    }
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/product/GetAllProducts`, { params });
  }

  // Updated method to search for product categories
  searchCategories(searchValue: string): Observable<ProductCategory[]> {
    let params = new HttpParams();
    if (searchValue) {
      params = params.set('search', searchValue);
    }
    return this.http.get<ProductCategory[]>(`${this.baseApiUrl}/api/product-categories`, { params });
  }

  // Add a product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseApiUrl}/api/product/add-product`, product);
  }

  // Upload an image for the product
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseApiUrl}/api/product/uploadImage`, formData);
  }
}
