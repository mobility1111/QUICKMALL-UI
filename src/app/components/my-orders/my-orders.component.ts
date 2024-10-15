
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  currentPage = 1;
  itemsPerPage = 2;  // Set how many orders you want to display per page
  totalPages = 1;
  pages: number[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe(
      (orders) => {
        this.orders = orders;
        this.calculatePagination();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  viewOrderDetails(order: Order) {
    this.router.navigate(['/order', order.orderId]); // Assuming you're navigating to order details
  }

  cancelOrder(order: Order) {
    if (order.status === 'Pending') {
      //order.status = 'Cancelled';
      console.log('Order cancelled:', order);
      // You can also call an API to update the order status here if needed
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
















// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-my-orders',
//   templateUrl: './my-orders.component.html',
//   styleUrls: ['./my-orders.component.css']
// })
// export class MyOrdersComponent implements OnInit {
//   orders = [
//     { id: 'QK001', productName: 'Samsung Galaxy S21', quantity: 1, price: 250000, orderDate: new Date('2024-09-01'), status: 'Pending' },
//     { id: 'QK002', productName: 'Apple MacBook Pro', quantity: 1, price: 950000, orderDate: new Date('2024-08-25'), status: 'Shipped' },
//     { id: 'QK003', productName: 'Nike Air Max', quantity: 2, price: 70000, orderDate: new Date('2024-08-15'), status: 'Delivered' },
//     // Add more sample orders for testing
//   ];

//   currentPage = 1;
//   itemsPerPage = 2;  // Set how many orders you want to display per page
//   totalPages = 1;
//   pages: number[] = [];

//   ngOnInit() {
//     this.calculatePagination();
//   }

//   calculatePagination() {
//     this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
//     this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
//   }

//   getStatusClass(status: string) {
//     switch (status) {
//       case 'Pending':
//         return 'status-pending';
//       case 'Shipped':
//         return 'status-shipped';
//       case 'Delivered':
//         return 'status-delivered';
//       case 'Cancelled':
//         return 'status-cancelled';
//       default:
//         return '';
//     }
//   }

//   viewOrderDetails(order: any) {
//     console.log('Viewing details for order:', order);
//   }

//   cancelOrder(order: any) {
//     if (order.status === 'Pending') {
//       order.status = 'Cancelled';
//       console.log('Order cancelled:', order);
//     }
//   }

//   goToPage(page: number) {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       // Logic to load the corresponding page of orders
//     }
//   }
// }
