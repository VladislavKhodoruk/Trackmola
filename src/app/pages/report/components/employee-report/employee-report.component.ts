import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import check from '@iconify/icons-tabler/check';
@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeReportComponent {
  @Input() currentDate!: Date;

  iconCheck = check;

  submitReport(event: Event) {
    event.preventDefault();
  }
}
