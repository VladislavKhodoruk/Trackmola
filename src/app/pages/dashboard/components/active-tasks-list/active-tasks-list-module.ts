import { NgModule } from '@angular/core';
import { ActiveTasksListContainer } from '@pages/dashboard/components/active-tasks-list/active-tasks-list.container';
import { ActiveTasksListComponent } from '@pages/dashboard/components/active-tasks-list/active-tasks-list.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '@visurel/iconify-angular';
import { ActiveTaskItemComponent } from '@pages/dashboard/components/active-tasks-list/active-task-item/active-task-item.component';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { ButtonModule } from '@shared/components/button/button.module';

@NgModule({
  declarations: [
    ActiveTasksListContainer,
    ActiveTasksListComponent,
    ActiveTaskItemComponent,
  ],
  imports: [CommonModule, IconModule, UsersPhotosModule, ButtonModule],
  exports: [ActiveTasksListContainer],
})
export class ActiveTasksListModule {}
