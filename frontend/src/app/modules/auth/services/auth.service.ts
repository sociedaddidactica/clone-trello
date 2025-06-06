import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  // ✅ Login con "username" como requiere el backend
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/auth/login`, {
      username: email,   // El backend espera "username"
      password
    });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/auth/register`, user);
  }
}
