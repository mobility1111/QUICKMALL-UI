import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitContactForm() {
    // Logic for submitting the form
    console.log('Contact Form Submitted', this.contactForm);
  }
}
