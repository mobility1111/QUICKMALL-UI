import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  paymentInProgress: boolean = false;
  paymentError: string = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const totalPrice = params['totalPrice'];
      const paymentType = params['paymentType'];
      this.paymentForm = this.fb.group({
        amount: [totalPrice || '', [Validators.required, Validators.min(1)]],
        email: ['', [Validators.required, Validators.email]],
        paymentType: [paymentType || '', [Validators.required]],
        shippingAddress: ['', Validators.required],
        billingAddress: ['', Validators.required],
        userId: [this.authService.getUserIdFromToken()]
        // Add other form controls as needed
      });
    });
  }

  initiatePayment() {
    if (this.paymentForm.valid && !this.paymentInProgress) {
      this.paymentInProgress = true;
      const paymentData = this.paymentForm.value;
      this.paymentService.initiatePayment(paymentData).subscribe(
        (response) => {
          // Handle success response
          console.log('Payment initiated successfully:', response);
          // Redirect user to payment gateway or show success message
          window.location.href = response.data.authorization_url;
        },
        (error) => {
          // Handle error response
          console.error('Failed to initiate payment:', error);
          this.paymentError = 'Failed to initiate payment. Please try again later.';
          this.paymentInProgress = false;
        }
      );
    }
  }
}