import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Injectable,
  inject,
  Renderer2,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  isloggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}register`,
      registerObj
    );
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  logoutService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    console.log(token);
    
    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.post<any>(
      `${apiUrls.authServiceApi}logout`,
      {},
      { headers }
    );
  }

  forgetPasswordService(emailObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}forgetPassword`,
      emailObj
    );
  }

  resetPasswordService(token: string, newPassword: string) {
    const url = `${apiUrls.authServiceApi}resetPassword/${token}`;
    return this.http.post<any>(url, { password: newPassword });
  }

  skipResetPasswordService(token: string) {
    const url = `${apiUrls.authServiceApi}skipResetPassword/${token}`;
    return this.http.post<any>(url, { });
  }
  
  loginByEmailService(email: string){
    return this.http.post<any>(
      `${apiUrls.authServiceApi}loginByEmail`,
     {email: email}
    );
  }

  changeCurrentPasswordService(oldPassword:string, newPassword:string){
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    console.log(token);
    
    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.post<any>(
      `${apiUrls.authServiceApi}change-password`,
     {oldPassword: oldPassword, newPassword:newPassword},
     { headers }
    );
  }


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user_id');
    }
    return false;
  }
}
