import { Component } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.services';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.scss'],
})
export class EmployeeLayoutComponent {
  constructor(private auth: AuthService) {}

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }
}
