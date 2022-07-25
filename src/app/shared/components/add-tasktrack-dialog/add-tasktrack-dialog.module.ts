import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { IconModule } from '@visurel/iconify-angular';

import { AddTasktrackDialogComponent } from './add-tasktrack-dialog.component';
import { AddTasktrackDialogContainer } from './add-tasktrack-dialog.container';

import { ReportInputModule } from '../report-input/report-input.module';

@NgModule({
  declarations: [AddTasktrackDialogComponent, AddTasktrackDialogContainer],
  exports: [AddTasktrackDialogContainer],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    MatDialogModule,
    ReportInputModule,
  ],
})
export class AddTasktrackDialogModule {}
