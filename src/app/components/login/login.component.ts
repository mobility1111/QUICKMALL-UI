import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validatateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash-fill";
  public loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
    ){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })
   }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = " bi-eye-fill" : this.eyeIcon = " bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid){

      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          //alert(res.message);
          console.log('Response:', res.message);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          console.error('Login Error:', err.error);
          this.toast.error({detail:"ERROR", summary: err.error, duration: 5000});
          //alert(err.error.message);
          // const summary = (err && err.message) ? err.message.summary : "Something went wrong!";
          // this.toast.error({ detail: "ERROR", summary: summary, duration: 5000 });
          // console.log(err);
        }
        
      })

    }else{

      validatateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");

    }
  }

  checkValidEmail(event: string){
    const value = event;
    const Pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = Pattern.test(value);
    return this.isValidEmail;
}

 confirmToSend(){
   if(this.checkValidEmail(this.resetPasswordEmail)){
     console.log(this.resetPasswordEmail);
     this.resetService.sendResetPsswordLink(this.resetPasswordEmail)
     .subscribe({
       next:(res)=>{
         this.toast.success({
           detail: 'Success',
           summary: 'Email sent, check your email',
           duration: 6000,
         });
         this.resetPasswordEmail = "";
         const buttonRef = document.getElementById("closeBtn");
         buttonRef?.click();

       },
       error:(err)=>{
         this.toast.error({
           detail: 'ERROR',
           summary: 'Something went wrong',
           duration: 3000,
         });
       
       }
     })
   }
 }

 
}
