// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, catchError, switchMap, throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { NgToastService } from 'ng-angular-popup';
// import { Router } from '@angular/router';
// import { TokenApiModel } from '../models/token-api.model';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private auth: AuthService, private toast: NgToastService, private router: Router){}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const myToken = this.auth.getToken();

//     if(myToken){
//       request = request.clone({
//         setHeaders: {Authorization:`Bearer ${myToken}`}  // "Bearer "+myToken
//       })
//     }

//     return next.handle(request).pipe(
//       catchError((err:any)=>{
//         console.log("check1");
//         if(err instanceof HttpErrorResponse){
//           if(err.status === 401){
//             //this.toast.warning({detail:"Warning", summary:"Session is expired, Please Login again"});
//             //this.router.navigate(['login'])
//            return this.handleUnAuthorizedError(request, next);
//           }
//         }
//         return throwError(()=> new Error("Some other error occured"))
//       })
//     );
//   }

//   handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
//     let tokeApiModel = new TokenApiModel();
//     tokeApiModel.accessToken = this.auth.getToken()!;
//     tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
//     return this.auth.renewToken(tokeApiModel)
//     .pipe(
//       switchMap((data:TokenApiModel)=>{
//         this.auth.storeRefreshToken(data.refreshToken);
//         this.auth.storeToken(data.accessToken);
//         req = req.clone({
//           setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
//         })
//         return next.handle(req);
//       }),
//       catchError((err)=>{
//         return throwError(()=>{
//           this.toast.warning({detail:"Warning", summary:"Session is expired, Please Login again"});
//           this.router.navigate(['login'])
//         })
//       })
//     )
//   }
  
//   }



import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        console.log("check1");
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.AccessToken = this.auth.getToken()!;
    tokenApiModel.RefreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          this.auth.storeRefreshToken(data.RefreshToken);
          this.auth.storeToken(data.AccessToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.AccessToken}` }
          });
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            this.toast.warning({ detail: "Warning", summary: "Session is expired, Please Login again" });
            this.router.navigate(['login']);
          });
        })
      );
  }
}