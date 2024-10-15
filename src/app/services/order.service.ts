import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderStatusResponse } from '../models/OrderStatusResponse';
import { PlaceOrderRequest } from '../models/PlaceOrderRequest';
import { environment } from '../environments/environment';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  placeOrder(placeOrderRequest: PlaceOrderRequest): Observable<string> {
    return this.http.post<string>(`${this.baseApiUrl}/api/Order/place`, placeOrderRequest);
  }

  getOrder(orderId: string): Observable<Order> {
    const url = `${this.baseApiUrl}/api/Order/${orderId}`;
    return this.http.get<Order>(url);
  }

  getOrderHistory(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseApiUrl}/api/Order/history/${userId}`);
  }

  trackOrder(orderId: string): Observable<OrderStatusResponse> {
    return this.http.get<OrderStatusResponse>(`${this.baseApiUrl}/api/Order/track/${orderId}`);
  }

  getOrderStatus(orderId: string): Observable<OrderStatusResponse> {
    return this.http.get<OrderStatusResponse>(`${this.baseApiUrl}/api/Order/track/${orderId}`);
  }

  updateOrder(orderId: string, order: Order): Observable<any> {
    const url = `${this.baseApiUrl}/api/Order/${orderId}`;
    return this.http.put(url, order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseApiUrl}/api/Order`);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseApiUrl}/api/Order/${orderId}`);
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseApiUrl}/api/Order/user/${userId}`);
  }
}