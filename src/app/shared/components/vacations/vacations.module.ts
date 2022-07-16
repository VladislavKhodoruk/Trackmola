import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { VacationsComponent } from '@shared/components/vacations/components/vacations/vacations.component';
import { VacationsContainer } from '@shared/components/vacations/components/vacations/vacations.container';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [VacationsContainer, VacationsComponent],
  imports: [CommonModule, IconModule],
  exports: [VacationsContainer],
})
export class VacationsModule {}
