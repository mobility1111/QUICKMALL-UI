import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  currentPage = 1;  // Current page
  itemsPerPage = 5; // Number of orders per page
  totalPages = 1;   // Total number of pages
  pages: number[] = []; // Array to store page numbers

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.loadOrders(userId);
    }
  }

  // Load orders and calculate pagination
  loadOrders(userId: string): void {
    this.orderService.getOrderHistory(userId).subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.calculatePagination();
      },
      error: (error: any) => {
        console.error('Failed to fetch order history:', error);
      }
    });
  }

  // Calculate pagination based on the number of orders
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Track order logic
  trackOrder(orderId: string): void {
    this.router.navigate(['/order-tracking', orderId]);
  }
}
