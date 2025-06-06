import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { username, password } = this.form.getRawValue();

      this.authService.login(username, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: (err) => {
          this.status = 'failed';
          console.error('Error de login:', err);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

