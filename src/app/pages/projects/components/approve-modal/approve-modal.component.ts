import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import x from '@iconify/icons-tabler/x';

import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-approve-modal',
  styleUrls: ['./approve-modal.component.scss'],
  templateUrl: './approve-modal.component.html',
})
export class ApproveModalComponent {
  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  iconX = x;
  panelOpenState = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { project: Project }
  ) {}
}
