import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products = [
    {
      name: 'Samsung Galaxy S21',
      description: 'A powerful smartphone with an amazing camera.',
      price: 250000,
      imageUrl: 'assets/images/samsung-galaxy-s21.jpg'
    },
    {
      name: 'Apple MacBook Pro',
      description: 'A sleek and powerful laptop for professionals.',
      price: 950000,
      imageUrl: 'assets/images/macbook-pro.jpg'
    },
    {
      name: 'Nike Air Max',
      description: 'Comfortable and stylish sneakers for everyday wear.',
      price: 35000,
      imageUrl: 'assets/images/nike-air-max.jpg'
    }
  ];

  addToCart(product: any) {
    // Logic to add the product to the cart
    console.log('Product added to cart:', product);
  }
}
