import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ActiveTasks } from './../../interfaces/interfaces';

@Component({
  selector: 'app-add-tasktrack-dialog-component',
  templateUrl: './add-tasktrack-dialog.component.html',
  styleUrls: ['./add-tasktrack-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTasktrackDialogComponent {
  @Input() formTask: ActiveTasks;
}
