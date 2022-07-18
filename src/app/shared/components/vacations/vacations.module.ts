import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { IconModule } from '@visurel/iconify-angular';

import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { VacationsItemComponent } from '@shared/components/vacations/components/vacations-item/vacations-item-component';
import { VacationsComponent } from '@shared/components/vacations/components/vacations/vacations.component';
import { VacationsContainer } from '@shared/components/vacations/components/vacations/vacations.container';

@NgModule({
  declarations: [
    VacationsContainer,
    VacationsComponent,
    VacationsItemComponent,
  ],
  imports: [CommonModule, IconModule, UsersPhotosModule],
  exports: [VacationsContainer, VacationsItemComponent, VacationsComponent],
})
export class VacationsModule {}
