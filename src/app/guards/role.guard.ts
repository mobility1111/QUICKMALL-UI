import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';


@Injectable({
  providedIn:'root'
})


export class RoleGuard implements CanActivate{

  role: any
  constructor(private auth : AuthService, private router: Router,
     private toast: NgToastService,
     private userStore: UserStoreService
    ){

  }

  canActivate(){
    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  
   if(this.role == "admin"){
    return true;
   }else{
    this.toast.error({detail:"ERROR", summary:"You dont't have admin rights"});
   //alert ("You dont't have admin rights")
    return false;
 
   }
 
  }
 
};
