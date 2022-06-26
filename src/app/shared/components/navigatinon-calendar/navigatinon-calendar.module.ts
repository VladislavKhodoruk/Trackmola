import { ButtonModule } from './../button/button.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';
import { NavigatinonCalendarComponent } from './navigatinon-calendar.component';
import { NavigatinonCalendarContainer } from './navigatinon-calendar.container';
import { UsersPhotosModule } from '../users-photos/users-photos.module';

@NgModule({
  declarations: [NavigatinonCalendarComponent, NavigatinonCalendarContainer],
  imports: [CommonModule, IconModule, ButtonModule, UsersPhotosModule],
  exports: [NavigatinonCalendarContainer],
})
export class NavigatinonCalendarModule {}
