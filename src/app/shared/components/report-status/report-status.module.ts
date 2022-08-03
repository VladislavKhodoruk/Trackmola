import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@visurel/iconify-angular';

import { ReportStatusComponent } from './report-status.component';

@NgModule({
  declarations: [ReportStatusComponent],
  exports: [ReportStatusComponent],
  imports: [CommonModule, IconModule],
})
export class ReportStatusModule {}
