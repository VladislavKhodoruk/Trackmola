import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ActiveTasks } from './../../interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-tasktrack-dialog-component',
  styleUrls: ['./add-tasktrack-dialog.component.scss'],
  templateUrl: './add-tasktrack-dialog.component.html',
})
export class AddTasktrackDialogComponent {
  @Input() formTask: ActiveTasks;
}
