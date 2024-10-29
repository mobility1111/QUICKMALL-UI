import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validatateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash-fill";
  signUpForm!: FormGroup;
  showLogin = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = " bi-eye-fill" : this.eyeIcon = " bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignup() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res=>{
          this.toast.success({ detail: 'SUCCESS', summary: res.message,duration: 7000 });
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error: (err=>{
          //console.error('Login Error:', err.error.message);
          this.toast.error({ detail: 'ERROR', summary: err.error.message,duration: 6000 });
          //alert(err?.error.message); // Assuming the message is in an "error.Message" property
          //console.error(err);
        })
              
      });
      console.log(this.signUpForm.value);
    } else {
      validatateForm.validateAllFormFields(this.signUpForm);
      alert('Invalid Form');
    }
  }
  

}