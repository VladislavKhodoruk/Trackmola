import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '@shared/services/API.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router, private apiService: APIService) {
    this.apiService.subscribeFirebaseChanges();
  }
}
