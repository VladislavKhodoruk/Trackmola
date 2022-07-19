import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { IconModule } from '@visurel/iconify-angular';

import { VacationsComponent } from './vacations.component';

import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';

@NgModule({
  declarations: [VacationsComponent],
  imports: [CommonModule, IconModule, UsersPhotosModule],
  exports: [VacationsComponent],
})
export class VacationsModule {}
