import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodayviewComponent } from './todayview.component';
import { TaskComponent } from './task/task.component';
import { IconModule } from '@visurel/iconify-angular';
import { TodayviewContainer } from './todayview.container';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    TodayviewComponent,
    TaskComponent,
    TodayviewContainer,
    ModalComponent,
  ],
  imports: [CommonModule, FormsModule, IconModule, MatDialogModule],
  exports: [TodayviewContainer],
})
export class TodayViewModule {}
