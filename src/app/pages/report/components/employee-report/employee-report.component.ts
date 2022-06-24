import { Component, OnInit } from '@angular/core';
import check from '@iconify/icons-tabler/check';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss'],
})
export class EmployeeReportComponent implements OnInit {
  iconCheck = check;

  ngOnInit(): void {}

  submitReport(event: Event) {}
}
