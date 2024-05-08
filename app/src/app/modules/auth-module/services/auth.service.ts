import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 
  
  constructor(private http: HttpClient) { }

  getHttpOptions() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload, this.getHttpOptions());
  }

  login(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload, this.getHttpOptions());
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, this.getHttpOptions());
  }
}
