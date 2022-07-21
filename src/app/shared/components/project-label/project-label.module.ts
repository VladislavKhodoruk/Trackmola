import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProjectLabelComponent } from './project-label.component';

@NgModule({
  declarations: [ProjectLabelComponent],
  imports: [CommonModule],
  exports: [ProjectLabelComponent],
})
export class ProjectLabelModule {}
