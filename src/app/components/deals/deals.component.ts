import { Component } from '@angular/core';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent {
  deals = [
    {
      name: '50% off on Nike Air Max',
      description: 'Get 50% off on these stylish and comfortable sneakers.',
      discount: 50,
      imageUrl: 'assets/images/nike-air-max.jpg'
    },
    {
      name: '30% off on Samsung Galaxy S21',
      description: 'Upgrade to the latest Samsung Galaxy with a 30% discount.',
      discount: 30,
      imageUrl: 'assets/images/samsung-galaxy-s21.jpg'
    },
    {
      name: 'Buy 1 Get 1 Free on Apple AirPods',
      description: 'Limited-time offer: Buy one Apple AirPods, get one free.',
      discount: 100,
      imageUrl: 'assets/images/apple-airpods.jpg'
    }
  ];

  addToCart(deal: any) {
    // Logic to add the deal to the cart
    console.log('Deal added to cart:', deal);
  }
}
