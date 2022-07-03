import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TaskTrack } from '@store/shared/shared.state';
import { SearchCurrentProjectName } from '@pages/dashboard/components/active-tasks-list/helpers/helpers';
import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-tasks-list',
  templateUrl: 'active-tasks-list.component.html',
  styleUrls: ['active-tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksListComponent implements OnChanges {
  @Input() allTasks!: TaskTrack[];
  @Input() allProjects!: Project[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allTasks && changes.allProjects) {
      console.log(SearchCurrentProjectName(this.allTasks, this.allProjects));
    }
  }

  get() {
    console.log(this.allTasks, this.allProjects)
  }
}
