import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts = [];

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    // Fetch featured products from backend or hardcode for now
    this.featuredProducts = [
      // { id: 1, title: 'Featured Product 1', price: 1500, imageUrl: 'assets/images/featured1.jpg' },
      // { id: 2, title: 'Featured Product 2', price: 2500, imageUrl: 'assets/images/featured2.jpg' },
      // Add more featured products here...
    ];
  }
}
