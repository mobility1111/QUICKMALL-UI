
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  // Get all products with optional search parameter
  getAllProducts(search?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/products`, { params });
  }

  // Get all products with image data formatted for display
  getAllProductsWithImageData(search?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${this.baseApiUrl}/api/products`, { params }).pipe(
      map((response: any) => {
        return response.map((product: any) => {
          return {
            ...product,
            imageData: `data:image/jpeg;base64,${product.imageData}`
          };
        });
      })
    );
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseApiUrl}/api/products/add`, product);
  }

  // Upload product image
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseApiUrl}/api/products/uploadImage`, formData);
  }

  // Get a single product by ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseApiUrl}/api/products/${productId}`);
  }
}
