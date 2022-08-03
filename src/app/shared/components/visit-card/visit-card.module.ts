import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { VisitCardComponent } from './visit-card.component';

@NgModule({
  declarations: [VisitCardComponent],
  exports: [VisitCardComponent],
  imports: [CommonModule],
})
export class VisitCardModule {}
