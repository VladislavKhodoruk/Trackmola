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
  constructor(private serv: SearchTaskName) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allTasks || changes.allProjects) {
      this.newAllTasks = this.allTasks.map((i) => ({
        projectId: searchName(i.projectId, this.allProjects),
        projectColor: searchProjectColor(i.projectId, this.allProjects),
        taskId: this.serv.getTaskName(i.taskId),
        userId: i.userId,
        date: i.date,
        comments: i.comments,
        duration: i.duration,
        status: i.status,
      }));
    }
  }

  get() {
    console.log(this.allTasks, this.newAllTasks, this.allProjects);
  }
}
