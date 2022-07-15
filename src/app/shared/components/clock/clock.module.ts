import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { ClockComponent } from './clock.component';

@NgModule({
  declarations: [ClockComponent],
  imports: [ChartModule, CommonModule],
  exports: [ClockComponent],
})
export class ClockModule {}
