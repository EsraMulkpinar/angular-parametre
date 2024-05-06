import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService) { }

  async login(): Promise<void> {
    try {
      const response = await this.authService.login({ email: this.email, password: this.password });
      const accessToken = response.access_token; // Sunucudan gelen access token
      localStorage.setItem('accessToken', accessToken); // Access token'i localStorage'a sakla
    } catch (error) {
      // Hata durumunda yapılacak işlemler
    }
  }
}
