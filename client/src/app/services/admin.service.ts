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
export class AdminService {
  http = inject(HttpClient);

  getSubjectSwitchOptionListService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(
      `${apiUrls.adminServiceApi}getSubjectSwitchOptionList`, { headers }
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
