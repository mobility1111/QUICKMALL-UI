import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order!: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.getOrderDetails(orderId);
    } else {
      console.error('Order ID is missing.');
      // Handle error or redirect to another page
    }
  }

  getOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(
      (order) => {
        this.order = order;
      },
      (error) => {
        console.error('Error fetching order details:', error);
        // Handle error here
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
