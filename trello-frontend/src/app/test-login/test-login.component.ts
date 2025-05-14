import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h1>🔐 Prueba de Login</h1>

    <form (ngSubmit)="login()">
      <label for="username">Usuario:</label>
      <input id="username" type="text" [(ngModel)]="username" name="username" required>

      <label for="password">Contraseña:</label>
      <input id="password" type="password" [(ngModel)]="password" name="password" required>

      <button type="submit">Iniciar sesión</button>
    </form>

    <p *ngIf="token">✅ Token recibido: {{ token }}</p>
    <p *ngIf="error" style="color: red;">❌ Error: {{ error }}</p>
  `
})
export class TestLoginComponent {
  username = 'admin@admin.com';
  password = 'admin123';
  token: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  login() {
    this.http.post<any>('http://localhost:3000/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.token = res.token;
        this.error = null;
      },
      error: (err) => {
        this.token = null;
        this.error = err.error?.error || 'Error desconocido';
      }
    });
  }
}
