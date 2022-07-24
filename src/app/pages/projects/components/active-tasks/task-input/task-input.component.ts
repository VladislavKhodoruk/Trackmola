import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import x from '@iconify/icons-tabler/x';

import { Project, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent {
  iconX = x;

  taskInput = new FormControl('', Validators.required);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { project: Project }
  ) {}
  addTask(): Task {
    return {
      name: this.taskInput.value,
      id: '',
      archived: false,
      projectId: this.data.project?.id,
    };
  }
}
