import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import x from '@iconify/icons-tabler/x';

import { Project, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-task-input',
  styleUrls: ['./task-input.component.scss'],
  templateUrl: './task-input.component.html',
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
      archived: false,
      id: '',
      name: this.taskInput.value,
      projectId: this.data.project?.id,
    };
  }
}
