import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import check from '@iconify/icons-tabler/check';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report',
  styleUrls: ['./report.component.scss'],
  templateUrl: './report.component.html',
})
export class ReportComponent {
  @Input() currentDate!: Date;

  iconCheck = check;

  submitReport(event: Event) {
    event.preventDefault();
  }
}
