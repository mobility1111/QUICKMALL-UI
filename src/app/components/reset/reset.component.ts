
import { NgToastService } from 'ng-angular-popup';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  eyeIcon: string = "bi-eye-slash-fill";
  isText: boolean = false;
  type: string = "password";


  constructor(private fb: FormBuilder, private activated: ActivatedRoute,
    private toast: NgToastService,
    private router: Router,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      });
    this.activated.queryParams.subscribe(val => {
      console.log(val);
      this.emailToReset = val['email'];
      let uriToken = (val['code']);
      this.emailToken = uriToken.replace(/ /g, '+');
      console.log(this.emailToken)
      console.log(this.emailToReset)
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye-fill" : this.eyeIcon = "bi-eye-slash-fill";
    this.type = this.isText ? "text" : "password";
  }
  


  reset() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      this.resetPasswordService.resetPassword(this.resetPasswordObj)
        .subscribe({
          next: (res) => {
            console.log('API Response:', res); // Log the response to verify it
            this.toast.success({
              detail: 'SUCCESS',
              summary: res.message,
              duration: 3000,
            });
            this.router.navigate(['/'])
          },
          error: (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: "Something went wrong",
              duration: 3000,
            });
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }
}