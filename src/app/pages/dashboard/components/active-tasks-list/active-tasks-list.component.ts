import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TaskTrack } from '@store/shared/shared.state';
import { Project } from '@shared/interfaces/interfaces';
import {
  searchName,
  searchProjectColor,
} from '@pages/dashboard/components/active-tasks-list/helpers/search-Project-Name';
import { SearchTaskName } from '@pages/dashboard/components/active-tasks-list/helpers/search-Task-Name';
import { SearchUserPhoto } from '@pages/dashboard/components/active-tasks-list/helpers/search-User-Foto';

@Component({
  selector: 'app-active-tasks-list',
  templateUrl: 'active-tasks-list.component.html',
  styleUrls: ['active-tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksListComponent implements OnChanges {
  @Input() allTasks!: TaskTrack[];
  @Input() allProjects!: Project[];
  newAllTasks!: TaskTrack[];
  constructor(
    private serv$: SearchTaskName,
    private servicePhoto: SearchUserPhoto
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allTasks || changes.allProjects) {
      this.newAllTasks = this.allTasks.map((i) => ({
        projectId: searchName(i.projectId, this.allProjects),
        taskId: this.serv$.getTaskName(i.taskId),
        userId: i.userId,
        status: i.status,
        date: i.date,
        duration: i.duration,
      }));
    }
  }
  get() {
    console.log(this.newAllTasks, this.allTasks);
  }
}


// projectColor: searchProjectColor(i.projectId, this.allProjects),
