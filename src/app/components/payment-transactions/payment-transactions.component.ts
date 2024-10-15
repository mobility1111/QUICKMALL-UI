// payment-transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { PaymentTransaction } from 'src/app/models/PaymentTransaction';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-payment-transactions',
  templateUrl: './payment-transactions.component.html',
  styleUrls: ['./payment-transactions.component.css']
})
export class PaymentTransactionsComponent implements OnInit {

  transactions: PaymentTransaction[] = [];
  isLoading: boolean = true;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.paymentService.getTransactions().subscribe(
      transactions => {
        this.transactions = transactions;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading payment transactions:', error);
        this.isLoading = false;
      }
    );
  }
}
