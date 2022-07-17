import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActiveTasks } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-add-tasktrack-dialog-container',
  template: `<app-add-tasktrack-dialog-component
    [formTask]="data.formTask"
  ></app-add-tasktrack-dialog-component>`,
})
export class AddTasktrackDialogContainer {
  @Input() add: ActiveTasks;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { formTask: ActiveTasks }
  ) {}
}
