import { Component, Input, Optional } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ActiveTasks, TaskTrack } from './../../interfaces/interfaces';

import { getTaskTrack } from '@pages/report/store/report.selectors';
import { ReportState } from '@pages/report/store/report.state';
import { AddTasktrackDialogContainer } from '@shared/components/add-tasktrack-dialog/add-tasktrack-dialog.container';
import { addTaskTrack, updateTaskTrack } from '@store/common/common.actions';
import { getProjects, getTasks, getDate } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';

@Component({
  selector: 'app-report-input-container',
  template: `<app-report-input
    [allProjects]="allProjects$ | async"
    [allTasks]="allTasks$ | async"
    [currentDate]="currentDate$ | async"
    [editableTaskTrack]="taskTrack$ | async"
    (editTaskTrack)="editTaskTrack($event)"
    (addCurTaskTrack)="addCurTaskTrack($event)"
    [formTask]="formTask"
    (closeDialog)="closeDialog()"
  ></app-report-input>`,
})
export class ReportInputContainer {
  @Input() formTask: ActiveTasks;

  allTasks$ = this.commonStore$.select(getTasks);
  allProjects$ = this.commonStore$.select(getProjects);
  currentDate$ = this.commonStore$.select(getDate);
  taskTrack$ = this.reportStore$.select(getTaskTrack);

  constructor(
    private reportStore$: Store<ReportState>,
    private commonStore$: Store<CommonState>,
    @Optional() private dialogRef: MatDialogRef<AddTasktrackDialogContainer>
  ) {}

  editTaskTrack(tasktrack: TaskTrack) {
    this.commonStore$.dispatch(updateTaskTrack({ tasktrack }));
  }

  addCurTaskTrack(tasktrack: TaskTrack) {
    this.commonStore$.dispatch(addTaskTrack({ tasktrack }));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
