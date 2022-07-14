import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';

import { NavigationCalendarComponent } from './navigation-calendar.component';

import { NavigationCalendarContainer } from './navigation-calendar.container';

import { ButtonModule } from '@shared/components/button/button.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';

@NgModule({
  declarations: [NavigationCalendarComponent, NavigationCalendarContainer],
  imports: [CommonModule, IconModule, ButtonModule, UsersPhotosModule],
  exports: [NavigationCalendarContainer],
})
export class NavigationCalendarModule {}
