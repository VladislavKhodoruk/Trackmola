import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@pages/dashboard/services/dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.subscribeFirebaseChanges();
  }
}
