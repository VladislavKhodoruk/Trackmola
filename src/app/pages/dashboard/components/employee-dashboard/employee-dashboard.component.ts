import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  styleUrls: ['./employee-dashboard.component.scss'],
  templateUrl: './employee-dashboard.component.html',
})
export class EmployeeDashboardComponent {
  today = new Date();
}
