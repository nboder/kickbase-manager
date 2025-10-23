import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  imports: [RouterModule, MatToolbar, MatIconButton, MatDrawerContainer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'manager';
}
