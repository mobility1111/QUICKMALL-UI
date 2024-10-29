import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  contactForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Handle form submission logic
      this.successMessage = "Thanks, we'll be in touch.";
      this.errorMessage = '';
    } else {
      this.successMessage = '';
      this.errorMessage = 'Please correct the errors and try again.';
    }
  }

  // contactForm = {
  //   name: '',
  //   email: '',
  //   message: ''
  // };

  // submitContactForm() {
  //   // Logic for submitting the form
  //   console.log('Contact Form Submitted', this.contactForm);
  // }
}
