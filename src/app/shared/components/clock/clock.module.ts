import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [ClockComponent],
  exports: [ClockComponent],
  imports: [ChartModule, CommonModule],
})
export class ClockModule {}
