import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import { taskTracksByUser } from '@pages/dashboard/helpers/helpers';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import { Project, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard-list-tasks',
  styleUrls: ['./manager-dashboard-list-tasks.component.scss'],
  templateUrl: './manager-dashboard-list-tasks.component.html',
})
export class ManagerDashboardListTasksComponent {
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly colors: string[];
  @Input() readonly chartXRangeHeight: number;

  @Output() selectTask = new EventEmitter<TaskForManager>();

  managerDashboardView = ManagerDashboardView;

  protected taskTracksByUserLength(taskTracks: TaskTrack[]): number {
    return taskTracksByUser(taskTracks).length;
  }
}
