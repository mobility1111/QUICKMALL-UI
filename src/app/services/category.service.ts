import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  // Add a new product category
  addCategory(category: ProductCategory): Observable<ProductCategory> {
    category.productCategoryId = '00000000-0000-0000-0000-000000000000'; // Assuming this ID format
    return this.http.post<ProductCategory>(`${this.baseApiUrl}/api/product-categories/addCategory`, category); // Corrected endpoint
  }

  // Get all product categories
  getAllCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.baseApiUrl}/api/product-categories`); // Corrected endpoint
  }
}
