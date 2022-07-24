import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { IconModule } from '@visurel/iconify-angular';

import { ModalComponent } from './modal/modal.component';
import { TaskComponent } from './task/task.component';
import { TodayviewComponent } from './todayview.component';

import { TodayviewContainer } from './todayview.container';

@NgModule({
  declarations: [
    TodayviewComponent,
    TaskComponent,
    TodayviewContainer,
    ModalComponent,
  ],
  exports: [TodayviewContainer],
  imports: [CommonModule, FormsModule, IconModule, MatDialogModule],
})
export class TodayViewModule {}
