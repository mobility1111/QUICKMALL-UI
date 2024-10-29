import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductDTO } from 'src/app/models/Product-Dto.model';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductService } from 'src/app/services/product.service'; // Updated to ProductService

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: ProductDTO = {
    id: '',
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    categoryId: '', // Initialize with an empty string or set based on user action
    isFeatured: false,
    imageData: ''
  };

  categories: ProductCategory[] = []; // Updated to ProductCategory
  selectedImage!: File;
  loading = true; // Added loading indicator

  constructor(private productService: ProductService) { } // Updated to ProductService

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories(): void {
    this.productService.getAllProductCategories().subscribe((categories) => { // Updated to get product categories
      this.categories = categories;
    });
  }

  addProduct() { // Updated method name to addProduct
    console.log('Product to be added:', this.product);

    // Use the product service to add the product to the backend
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        alert('Product added successfully');
        // Redirect or notify the user here
      },
      error: (error) => {
        console.log('Failed to add product:', error);
        alert(error);
        // Handle errors here
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.productService.uploadImage(this.selectedImage).subscribe({
        next: (res: any) => {
          const imageUrl = res.url;  // Assuming the server response has a property named 'url'
          console.log('Image URL:', imageUrl);
          this.product.imageUrl = imageUrl;
        },
        error: (error) => {
          console.log('Error uploading image:', error);

          // Provide more detailed error information
          if (error instanceof HttpErrorResponse) {
            console.error('HTTP Error Response:', error.status, error.statusText, error.error);
          } else if (error instanceof TypeError) {
            console.error('Type Error:', error.message);
          } else {
            console.error('Unexpected error:', error);
          }

          // Handle errors here
        }
      });
    }
  }
}
