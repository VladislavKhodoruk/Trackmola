import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateSwitchComponent } from './date-switch.component';

import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DateSwitchComponent],
  imports: [CommonModule, ButtonModule],
  exports: [DateSwitchComponent],
})
export class DateSwitchModule {}
