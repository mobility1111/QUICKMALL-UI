// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product'; // Change Medicine to Product
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
    private productService: ProductService // Change MedicineService to ProductService
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

  addToCart() {
    // Implement add to cart logic here
  }
}
