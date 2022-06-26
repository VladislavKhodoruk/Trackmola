import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';
import { UsersPhotosComponent } from './users-photos.component';

@NgModule({
  declarations: [UsersPhotosComponent],
  imports: [CommonModule, IconModule],
  exports: [UsersPhotosComponent],
})
export class UsersPhotosModule {}
