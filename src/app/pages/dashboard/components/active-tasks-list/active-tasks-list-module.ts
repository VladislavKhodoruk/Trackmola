import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';

import { ActiveTaskItemComponent } from '@pages/dashboard/components/active-tasks-list/active-task-item/active-task-item.component';
import { ActiveTasksListComponent } from '@pages/dashboard/components/active-tasks-list/active-tasks-list.component';
import { ActiveTasksListContainer } from '@pages/dashboard/components/active-tasks-list/active-tasks-list.container';
import { AddTasktrackDialogModule } from '@shared/components/add-tasktrack-dialog/add-tasktrack-dialog.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';

@NgModule({
  declarations: [
    ActiveTasksListContainer,
    ActiveTasksListComponent,
    ActiveTaskItemComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    UsersPhotosModule,
    ButtonModule,
    AddTasktrackDialogModule,
  ],
  exports: [ActiveTasksListContainer],
})
export class ActiveTasksListModule {}
