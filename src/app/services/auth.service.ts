import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { RegisterUserDto } from '../models/RegisterUserDto';
import { TokenApiModel } from '../models/token-api.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl: string = environment.baseApiUrl;
  private baseUrl: string = `${this.baseApiUrl}/api/user`;
  private userPayload: any;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }
  
  signUp(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/user/register`, userObj);
  }
  
  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/user/authenticate`, loginObj);
  }

  renewToken(tokenApi: TokenApiModel): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/user/refresh`, tokenApi);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    //console.log('Token stored:', tokenValue);
  }

  getToken() {
    const token = localStorage.getItem('token')
    console.log('Token retrieved:', token);
    return token;
  }

  
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
    localStorage.removeItem('token')
 }

 decodedToken(){
  const jwtHelper = new JwtHelperService();
  const token = this.getToken()!;
  console.log(jwtHelper.decodeToken(token))
  return jwtHelper.decodeToken(token)
}

getfullNameFromToken(){
  if(this.userPayload)
  return this.userPayload.name;
 }

 getRoleFromToken(){
   if(this.userPayload)
   return this.userPayload.role;
 }

 storeRefreshToken(tokenValue: string){
  localStorage.setItem('refreshToken', tokenValue)
}

getAuthHeaders(): HttpHeaders {
  const token = this.getToken();
  if (token) {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  } else {
    // Handle the case where there's no token (optional)
    console.error('No token available.');
    return new HttpHeaders();
  }
}

getUserIdFromToken(): string | null {
  const decodedToken = this.decodedToken();
  return decodedToken?.UserId || null;
}

getUserId(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
  }
  return null;
}

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  confirmEmailToken(email: string, token: string): Observable<any> {
    const confirmationUrl = `${this.baseApiUrl}/api/user/confirm-email?email=${email}&token=${token}`;
    const body = { email, token };

    return this.http.post<any>(confirmationUrl, body);
  }

  reactivationEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/user/reactivation-email?email=${email}`);
  }

}

