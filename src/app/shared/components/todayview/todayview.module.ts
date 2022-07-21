import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { IconModule } from '@visurel/iconify-angular';

import { ModalComponent } from './modal/modal.component';
import { TaskComponent } from './task/task.component';
import { TodayviewComponent } from './todayview.component';

import { TodayviewContainer } from './todayview.container';

import { ProjectLabelModule } from '../project-label/project-label.module';

@NgModule({
  declarations: [
    TodayviewComponent,
    TaskComponent,
    TodayviewContainer,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    MatDialogModule,
    ProjectLabelModule,
  ],
  exports: [TodayviewContainer],
})
export class TodayViewModule {}
