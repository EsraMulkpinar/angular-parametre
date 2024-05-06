import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;

  constructor(private authService: AuthService) { }

  register(): void {
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.authService.register(payload)
      .subscribe(
        response => {
          console.log("kayıt tamam usta");
          
          // Kayıt başarılı ise yapılacak işlemler
        },
        error => {
          // Hata durumunda yapılacak işlemler
        }
      );
  }
}
