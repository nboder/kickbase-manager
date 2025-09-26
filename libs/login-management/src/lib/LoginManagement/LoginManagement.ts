import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KickbaseLoginService } from '../management/kickbase-login-service';
import { LoginResponse } from '@kickbase/definitions';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { UserManagementService } from '../../../../user-management/src/lib/user-management-service';

@Component({
  selector: 'lib-login-management',
  imports: [FormsModule, MatInput, MatFormField, MatLabel],
  templateUrl: './LoginManagement.html',
  styleUrl: './LoginManagement.scss',
})
export class LoginManagement {
  username = signal<string>('');
  password = signal<string>('');

  private readonly loginService = inject(KickbaseLoginService);
  private readonly userService = inject(UserManagementService);

  loginUser() {
    this.loginService.login(this.username(), this.password()).subscribe({
      next: (loginResponse: LoginResponse) => {
        console.log(loginResponse);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
