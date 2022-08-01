import { Component, Input, OnInit } from '@angular/core';
import check from '@iconify/icons-tabler/check';
import { IconifyIcon } from '@iconify/types';

@Component({
  selector: 'app-report-status',
  styleUrls: ['./report-status.component.scss'],
  templateUrl: './report-status.component.html',
})
export class ReportStatusComponent {
  @Input() icon!: IconifyIcon;
  @Input() iconWidth!: string;
  @Input() iconHeight!: string;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly iconCheck = check;
}
