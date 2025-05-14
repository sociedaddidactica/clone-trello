import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { RouterLinkWithHref } from '@angular/router';
import { BackgroundComponent } from '../../components/background/background.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    RouterLinkWithHref,
    BackgroundComponent,
    FooterComponent,
    LoginFormComponent,
    HeaderComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  handleLogin(credentials: { username: string; password: string }): void {
    this.authService.login(credentials.username, credentials.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/app/boards']);
      },
      error: (err) => {
        console.error('Login fallido:', err);
        alert('Credenciales inválidas');
      }
    });
  }
}
