import { Component, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-login',
  imports: [MatFormField, MatLabel, MatInput, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = signal<string>('');
  password = signal<string>('');
  loginUser() {
    console.log("login called")
    console.log("Username: " + this.username())
    console.log("Password: " + this.password())
  }
}
