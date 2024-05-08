import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../user-module/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.access_token);  // JWT token'ı kontrol edin
        this.router.navigate(['/users']);
        console.log(response);
        
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  
}