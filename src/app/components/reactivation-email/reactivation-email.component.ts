import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reactivation-email',
  templateUrl: './reactivation-email.component.html',
  styleUrls: ['./reactivation-email.component.css']
})
export class ReactivationEmailComponent implements OnInit {
  public reactivationForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.reactivationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  onSubmit() {
    if (this.reactivationForm.valid) {
      const email = this.reactivationForm.get('email')!.value;
    
      this.auth.reactivationEmail(email).subscribe({
        next: () => {
          alert ('Reactivation email sent successfully!');
          
          this.reactivationForm.reset();
        
        },
        error: (err) => {
     
          console.error(err);
        }
      });
    } else {
   
      //Validators.validateAllFormFields(this.reactivationForm);
      alert('Your form is invalid');
    }
  }
}
