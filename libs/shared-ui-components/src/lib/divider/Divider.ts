import { Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'lib-divider',
  imports: [MatDivider],
  templateUrl: './Divider.html',
  styleUrl: './Divider.scss',
})
export class Divider {
  text = input<string>();
}
