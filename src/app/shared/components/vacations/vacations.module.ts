import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { IconModule } from '@visurel/iconify-angular';

import { VacationsComponent } from '@shared/components/vacations/components/vacations/vacations.component';
import { VacationsContainer } from '@shared/components/vacations/components/vacations/vacations.container';
import { VacationsItemComponent } from '@shared/components/vacations/components/vacations-item/vacations-item-component';

@NgModule({
  declarations: [
    VacationsContainer,
    VacationsComponent,
    VacationsItemComponent,
  ],
  imports: [CommonModule, IconModule],
  exports: [VacationsContainer],
})
export class VacationsModule {}
