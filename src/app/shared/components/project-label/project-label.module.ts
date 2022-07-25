import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { ProjectLabelComponent } from './project-label.component';

@NgModule({
  declarations: [ProjectLabelComponent],
  exports: [ProjectLabelComponent],
  imports: [CommonModule],
})
export class ProjectLabelModule {}
