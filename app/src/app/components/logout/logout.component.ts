import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService: AuthService) { }

  async logout(): Promise<void> {
    try {
      const accessToken = localStorage.getItem('accessToken'); 
      if (accessToken) {
        console.log(accessToken);
        
        await this.authService.logout(); 
        localStorage.removeItem('accessToken'); 
      }
    } catch (error) {
      // Hata durumunda yapılacak işlemler
    }
  }
}
