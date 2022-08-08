import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { getFilteredTasksTracks } from '@shared/helpers/helpers';
import {
  GroupBy,
  Project,
  TaskItem,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
@UntilDestroy()
export class ProjectsComponent implements OnChanges {
  @Input() taskItem!: TaskItem | null;
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;
  @Input() readonly taskTracks: TaskTrack[];

  @Input() readonly project: Project;
  @Input() readonly currentDate: number;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByTask: GroupBy<TaskTrack[]>;
  @Input() readonly usersInfoByUserId: GroupBy<User>;

  @Output() delete = new EventEmitter<string>();
  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  panelOpenState = false;
  filteredTaskTracks: TaskTrack[];

  readonly projectMode = ProjectMode;
  currentMode: string = ProjectMode.Tasks;

  readonly iconAngleRight = angleRight;
  readonly checksIcon = checksIcon;
  readonly messagePlusIcon = messagePlus;

  readonly toggleLabels = [ProjectMode.Tasks, ProjectMode.Users];

  readonly userType = UserType;
  readonly currentUser: string = localStorage.getItem('AuthUserType');

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.taskTracks) {
      this.filteredTaskTracks = getFilteredTasksTracks(
        this.taskTracks,
        this.currentDate
      );
    }
  }
  changeMode(mode: string): void {
    this.currentMode = mode;
  }

  modalApproveHours(enterAnimationDuration: string = dialogOpeningTime): void {
    const dialogRef = this.dialog.open(ApproveModalContainer, {
      autoFocus: false,
      data: { project: this.project },
      enterAnimationDuration,
      panelClass: 'modalApprove',
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
