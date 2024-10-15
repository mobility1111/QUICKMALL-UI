
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PaymentTransaction } from '../models/PaymentTransaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  initiatePayment(paymentRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/payment/initiate`, paymentRequest);
  }

  verifyTransaction(reference: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/api/payment/verify/${reference}`);
  }

  getPaymentTransactions(): Observable<PaymentTransaction[]> {
    return this.http.get<PaymentTransaction[]>(`${this.baseApiUrl}/api/payment/transactions`);
  }

  getTransactions(): Observable<PaymentTransaction[]> {
    return this.http.get<PaymentTransaction[]>(`${this.baseApiUrl}/api/payment/transactions`);
  }
}


















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { PaymentTransaction } from '../models/PaymentTransaction';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {
//   private apiUrl = 'https://localhost:7263/api';
//   private baseUrl = 'https://localhost:7263/api/payment/transactions';

//   constructor(private http: HttpClient) { }

//   initiatePayment(paymentRequest: any): Observable<any> {
//     // Make a POST request to your backend API to initiate payment
//     return this.http.post<any>(`${this.apiUrl}/payment/initiate`, paymentRequest);
//   }
  

//   verifyTransaction(reference: string): Observable<any> {
//     // Make a GET request to your backend API to verify transaction
//     return this.http.get<any>(`${this.apiUrl}/payment/verify/${reference}`);
//   }

//   getPaymentTransactions(): Observable<PaymentTransaction[]> {
//     // Adjust the URL based on your API endpoint for fetching payment transactions
//     const url = `${this.apiUrl}payment/transactions`;

//     // Make the HTTP GET request to fetch payment transactions
//     return this.http.get<PaymentTransaction[]>(url);
//   }

//   getTransactions(): Observable<PaymentTransaction[]> {
//     return this.http.get<PaymentTransaction[]>(this.baseUrl);
//   }
// }
