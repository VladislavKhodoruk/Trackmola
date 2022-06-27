import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';
import { ButtonModule } from '@shared/components/button/button.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { NavigatinonCalendarComponent } from './navigatinon-calendar.component';
import { NavigatinonCalendarContainer } from './navigatinon-calendar.container';

@NgModule({
  declarations: [NavigatinonCalendarComponent, NavigatinonCalendarContainer],
  imports: [CommonModule, IconModule, ButtonModule, UsersPhotosModule],
  exports: [NavigatinonCalendarContainer],
})
export class NavigatinonCalendarModule {}
