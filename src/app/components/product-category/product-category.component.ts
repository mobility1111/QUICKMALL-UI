import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { CategoryService } from 'src/app/services/category.service'; // Updated service import

@Component({
  selector: 'app-product-category', // Updated selector
  templateUrl: './product-category.component.html', // Updated template URL
  styleUrls: ['./product-category.component.css'] // Updated stylesheet URL
})
export class ProductCategoryComponent implements OnInit {
  categories: ProductCategory[] = []; // Updated type
  loading = true; // Added loading indicator
  
  // Pagination properties
  pageSize: number = 6; // Number of categories per page
  currentPage: number = 1; // Current page number
  totalItems: number = 0; // Total number of categories

  constructor(private categoryService: CategoryService) { } // Updated service injection

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories) => { // Updated method call
      this.categories = categories;
      this.totalItems = this.categories.length; // Set the total items
      this.loading = false; // Set loading to false once categories are loaded
    });
  }

  // Pagination methods
  get paginatedCategories(): ProductCategory[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.categories.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
