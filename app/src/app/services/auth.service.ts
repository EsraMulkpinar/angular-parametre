import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 
  
  constructor(private http: HttpClient) { }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  async login(payload: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/login`, payload).toPromise();
  }
  

  async logout(): Promise<Observable<any>> {
    return this.http.post(`${this.apiUrl}/logout`, httpOptions);
  }
  
  
}
