import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSwitchComponent } from './date-switch.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DateSwitchComponent],
  imports: [CommonModule, ButtonModule],
  exports: [DateSwitchComponent],
})
export class DateSwitchModule {}
