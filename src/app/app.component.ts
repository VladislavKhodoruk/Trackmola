import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from '@shared/enums/enum';

import { APIService } from '@shared/services/API.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  verstMode = true;

  readonly routes: typeof Route = Route;

  constructor(public router: Router, private apiService: APIService) {
    if (this.verstMode) {
      this.apiService.useMockData();
      return;
    }
    this.apiService.subscribeFirebaseChanges();
  }
}
