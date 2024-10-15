
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  sendResetPsswordLink(email: string){
     return this.http.post<any>(`${this.baseApiUrl}/api/User/send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/User/reset-password`, resetPasswordObj)
      .pipe(
        tap(response => {
          console.log('API Response:', response); // Log the response
        })
      );
  }
}

