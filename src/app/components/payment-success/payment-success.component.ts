import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PlaceOrderRequest } from 'src/app/models/PlaceOrderRequest';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paymentType = params['paymenttype'];

      if (paymentType === 'medicine') {
        // Handle product purchase
        this.placeOrder();
      } else {
        console.log('Payment type is not recognized.');
      }
    });
  }

  placeOrder(): void {
    const userId = this.auth.getUserIdFromToken();
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    const placeOrderRequest: PlaceOrderRequest = {
      userId
      // Add any other necessary fields
    };

    this.orderService.placeOrder(placeOrderRequest).subscribe({
      next: (orderId: string) => {
        console.log('Order placed successfully. Order ID:', orderId);
        // Handle success response for placing order
      },
      error: (error: any) => {
        if (error.status === 400) {
          console.error('Bad request error:', error.error);
        } else {
          console.error('Failed to place order:', error);
        }
        // Handle error response for placing order
      }
    });
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
