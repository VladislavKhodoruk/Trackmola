import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';

import { UsersPhotosComponent } from './users-photos.component';

@NgModule({
  declarations: [UsersPhotosComponent],
  exports: [UsersPhotosComponent],
  imports: [CommonModule, IconModule],
})
export class UsersPhotosModule {}
