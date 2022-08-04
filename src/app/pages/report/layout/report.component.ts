import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import check from '@iconify/icons-tabler/check';
import { IconifyIcon } from '@iconify/types';

import { ReportSendModalContainer } from '../components/report-send-modal/report-send-modal.container';

import { Period, TaskTrack } from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report',
  styleUrls: ['./report.component.scss'],
  templateUrl: './report.component.html',
})
export class ReportComponent {
  @Input() taskTracks!: TaskTrack[];
  @Input() currentDate!: number;
  @Input() period!: Period;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();

  readonly iconCheck: IconifyIcon = check;

  constructor(public dialog: MatDialog) {}

  modalSendReport(): void {
    this.dialog.open(ReportSendModalContainer);
  }
}
