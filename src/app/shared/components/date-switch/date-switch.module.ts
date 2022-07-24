import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateSwitchComponent } from './date-switch.component';

import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DateSwitchComponent],
  exports: [DateSwitchComponent],
  imports: [CommonModule, ButtonModule],
})
export class DateSwitchModule {}
