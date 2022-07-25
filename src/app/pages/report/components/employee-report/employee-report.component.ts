import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import check from '@iconify/icons-tabler/check';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-employee-report',
  styleUrls: ['./employee-report.component.scss'],
  templateUrl: './employee-report.component.html',
})
export class EmployeeReportComponent {
  @Input() currentDate!: Date;

  iconCheck = check;

  submitReport(event: Event) {
    event.preventDefault();
  }
}
