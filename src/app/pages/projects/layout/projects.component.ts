import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import checksIcon from '@iconify/icons-tabler/checks';
import messagePlus from '@iconify/icons-tabler/message-plus';
import angleRight from '@iconify/icons-uil/angle-right';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { take, filter } from 'rxjs';

import { ApproveModalContainer } from '../components/approve-modal/approve-modal.container';
import { ProjectMode } from '../enums/enums';

import { dialogOpeningTime } from '@shared/constants/constants';
import { UserType } from '@shared/enums/enum';
import { getVacationsAndHolidaysByProject } from '@shared/helpers/helpers';
import {
  GroupBy,
  Project,
  TaskItem,
  TaskTrack,
  User,
  Vacation,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'projectsClass' },
    },
  ],

  selector: 'app-projects',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
@UntilDestroy()
export class ProjectsComponent {
  @Input() readonly taskItem!: TaskItem | null;
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;
  @Input() readonly taskTracks: TaskTrack[];
  @Input() readonly filteredTaskTracksByPeriod: TaskTrack[];

  @Input() readonly project: Project;
  @Input() readonly currentDate: number;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByTask: GroupBy<TaskTrack[]>;
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly users: User[];
  @Input() readonly vacations: Vacation[];

  @Output() delete = new EventEmitter<string>();
  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  panelOpenState = false;
  currentMode: string = ProjectMode.Tasks;

  readonly projectMode = ProjectMode;
  readonly iconAngleRight = angleRight;
  readonly checksIcon = checksIcon;
  readonly messagePlusIcon = messagePlus;

  readonly toggleLabels =
    localStorage.getItem('AuthUserType') !== UserType.CTO
      ? [ProjectMode.Tasks, ProjectMode.Users]
      : [ProjectMode.Tasks, ProjectMode.Users, 'by budget'];

  readonly userType = UserType;
  readonly currentUser: string = localStorage.getItem('AuthUserType');

  protected get vacationsAndHolidaysTeam(): Vacations[] {
    if (this.projectByRoute && this.vacations.length && this.users.length) {
      return getVacationsAndHolidaysByProject(
        this.usersGroupByProject[this.projectByRoute.id],
        this.vacations,
        this.users
      );
    }

    return [];
  }

  constructor(public dialog: MatDialog) {}

  changeMode(mode: string): void {
    this.currentMode = mode;
  }

  modalApproveHours(enterAnimationDuration: string = dialogOpeningTime): void {
    const dialogRef = this.dialog.open(ApproveModalContainer, {
      autoFocus: false,
      data: { project: this.project },
      enterAnimationDuration,
      panelClass: 'modal',
    });
    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        take(1),
        filter((item) => !!item)
      )
      .subscribe((task: Task) => {
        this.addTask.emit(task);
      });
  }
}
