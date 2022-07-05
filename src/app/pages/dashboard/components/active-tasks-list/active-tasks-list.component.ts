import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TaskTrack } from '@store/shared/shared.state';

@Component({
  selector: 'app-active-tasks-list',
  templateUrl: 'active-tasks-list.component.html',
  styleUrls: ['active-tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksListComponent implements OnChanges {
  @Input() fullTask!: TaskTrack[];
  newAllTasks!: TaskTrack[];

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.fullTask);
  }
}
