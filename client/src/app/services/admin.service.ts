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
      `${apiUrls.adminServiceApi}getSubjectSwitchOptionList`,
      { headers }
    );
  }

  getStudentsDataListForAttendanceService(academicObj: any) {
    return this.http.post<any>(
      `${apiUrls.attendanceServiceApi}getStudentsDataListForAttendance`,
      academicObj
    );
  }

  getSubjectSwitchOptionListForViewAttendanceService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(
      `${apiUrls.adminServiceApi}getSubjectSwitchOptionListForViewAttendance`,
      { headers }
    );
  }

  getAttendanceDataService(academicObj: any) {
    return this.http.post<any>(
      `${apiUrls.attendanceServiceApi}getAttendanceData`,
      academicObj
    );
  }

  fillAttendanceService(attendanceData: any) {
    return this.http.post<any>(
      `${apiUrls.attendanceServiceApi}fillAttendance`,
      attendanceData
    );
  }

  registerAdminService(formData: FormData) {
    return this.http.post<any>(
      `${apiUrls.adminServiceApi}registerAdmin`,
      formData
    );
  }

  getSubjectListByYSBService(year: string, semester: string, branch: string) {
    return this.http.post<any>(
      `${apiUrls.subjectServiceApi}getSubjectListByYSB`,
      { year: year, semester: semester, branch: branch }
    );
  }

  getNewStudentListService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(`${apiUrls.adminServiceApi}newStudentList`, {
      headers,
    });
  }

  getNewTeacherListService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(`${apiUrls.adminServiceApi}newTeacherList`, {
      headers,
    });
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user_id');
    }
    return false;
  }
}
