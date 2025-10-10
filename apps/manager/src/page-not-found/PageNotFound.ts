import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './PageNotFound.html',
  styleUrl: './PageNotFound.scss',
})
export class PageNotFound {
  protected readonly AppRouteDefinitions = AppRouteDefinitions;
}
