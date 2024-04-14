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

  getStudentTeacherLeaveService(userType: string) {
    // Send HTTP GET request
    return this.http.post<any>(
      `${apiUrls.leaveServiceApi}getLeaveApplicationListStudentTeacher`,
      { userType: userType }
    );
  }

  getAllStudentListService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(`${apiUrls.adminServiceApi}allStudentsList`, {
      headers,
    });
  }

  getAllTeacherListService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(`${apiUrls.adminServiceApi}allTeachersList`, {
      headers,
    });
  }

  getViewTeacherProfileService(_id: string) {
    // Send HTTP GET request
    return this.http.post<any>(`${apiUrls.adminServiceApi}viewTeacherProfile`, {
      _id: _id,
    });
  }

  getViewHODProfileService(_id: string) {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send HTTP GET request with headers
    return this.http.get<any>(
      `${apiUrls.adminServiceApi}viewHODProfile`,

      {
        headers,
      }
    );
  }

  getViewStudentProfileService(_id: string) {
    // Send HTTP GET request
    return this.http.post<any>(`${apiUrls.adminServiceApi}viewStudentProfile`, {
      _id: _id,
    });
  }

  addLeaveApplicationStudentTeacherService(
    startDate: String,
    endDate: String,
    reason: String
  ) {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Create an object with the parameters
    const body = { startDate: startDate, endDate: endDate, reason: reason };

    // Send HTTP POST request with headers and body
    return this.http.post<any>(
      `${apiUrls.leaveServiceApi}addLeaveApplicationStudentTeacher`,
      body,
      { headers }
    );
  }

  approveLeaveApplicationStudentTeacherService(_id: String, userType: String) {
    // Send HTTP POST request
    return this.http.post<any>(
      `${apiUrls.leaveServiceApi}approveLeaveApplicationStudentTeacher`,
      {
        _id: _id,
        userType: userType,
      }
    );
  }

  rejectLeaveApplicationStudentTeacherService(_id: String, userType: String) {
    // Send HTTP POST request
    return this.http.post<any>(
      `${apiUrls.leaveServiceApi}rejectLeaveApplicationStudentTeacher`,
      {
        _id: _id,
        userType: userType,
      }
    );
  }

  acceptNewTeacherService(_id: String) {
    // Send HTTP POST request
    return this.http.post<any>(`${apiUrls.adminServiceApi}acceptNewTeacher`, {
      teacherId: _id,
    });
  }

  acceptNewStudentService(_id: String) {
    // Send HTTP POST request
    console.log(_id);

    return this.http.post<any>(`${apiUrls.adminServiceApi}acceptNewStudent`, {
      studentId: _id,
    });
  }

  rejectNewTeacherService(_id: String) {
    // Send HTTP POST request
    return this.http.post<any>(`${apiUrls.adminServiceApi}rejectNewTeacher`, {
      teacherId: _id,
    });
  }

  rejectNewStudentService(_id: String) {
    // Send HTTP POST request
    return this.http.post<any>(`${apiUrls.adminServiceApi}rejectNewStudent`, {
      studentId: _id,
    });
  }

  removeStudentService(_id: String) {
    // Send HTTP POST request
    return this.http.post<any>(`${apiUrls.adminServiceApi}removeStudent`, {
      _id: _id,
    });
  }

  removeTeacherService(_id: String) {
    // Send HTTP POST request
    return this.http.post<any>(`${apiUrls.adminServiceApi}removeTeacher`, {
      _id: _id,
    });
  }

  getStudentDataForFillUTMarksService(academicObj: any) {
    return this.http.post<any>(
      `${apiUrls.unitTestServiceApi}getStudentDataForFillUTMarks`,
      academicObj
    );
  }

  addAndUpdateMarksSubjectWiseService(utmarksData: any) {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${apiUrls.unitTestServiceApi}addAndUpdateMarksSubjectWise`,
      utmarksData,
      { headers }
    );
  }

  getSubjectListByCurrentAdminService() {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${apiUrls.subjectServiceApi}getSubjectListByCurrentAdmin`,
      {},
      { headers }
    );
  }

  // addSharedResource
  addSharedResource(formData: FormData) {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');

    // Set headers with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(
      `${apiUrls.resourceServiceApi}addSharedResource`,
      formData,
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
