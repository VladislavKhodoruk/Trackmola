import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { IconModule } from '@visurel/iconify-angular';

import { HolidaysComponent } from './holidays.component';

@NgModule({
  declarations: [HolidaysComponent],
  exports: [HolidaysComponent],
  imports: [CommonModule, IconModule],
})
export class HolidaysModule {}
