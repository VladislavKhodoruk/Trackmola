/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';
import { taskTracksByUser } from '@shared/helpers/helpers';

import { GroupBy, Project, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-legend',
  styleUrls: ['./legend.component.scss'],
  templateUrl: './legend.component.html',
})
export class LegendComponent {
  @Input() readonly project: Project;
  @Input() readonly tasks: TaskForManager[];
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly chartXRangeHeight: number;
  @Input() readonly activeTask: TaskForManager;
  @Input() readonly colors: GroupBy<string>;

  @Output() selectTask = new EventEmitter<TaskForManager>();

  managerDashboardView = ManagerDashboardView;

  protected taskTracksByUserLength(taskTracks: TaskTrack[]): number {
    return taskTracksByUser(taskTracks).length;
  }
}
