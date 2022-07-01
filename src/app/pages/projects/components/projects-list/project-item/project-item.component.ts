import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  Project,
  TaskTrack,
  User,
} from '@pages/projects/interfaces/interfaces';
import { getFirstAndLastDay } from '@shared/helpers/helpers';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnChanges {
  @Input() readonly project!: Project;
  @Input() readonly usersInProject!: User[];
  @Input() readonly activeTasksInProject!: TaskTrack[];
  @Output() readonly getActiveTasksInProject = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && this.project) {
      this.getActiveTasksInProject.emit({
        projectId: this.project.id,
        period: getFirstAndLastDay(new Date(), 'week'),
      });
    }
  }
}
