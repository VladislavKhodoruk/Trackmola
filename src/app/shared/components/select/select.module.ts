import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { SelectComponent } from './select.component';

@NgModule({
  declarations: [SelectComponent],
  exports: [SelectComponent],
  imports: [CommonModule, MatSelectModule, FormsModule],
})
export class SelectModule {}
