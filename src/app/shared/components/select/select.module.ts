import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, MatSelectModule, FormsModule],
  exports: [SelectComponent],
})
export class SelectModule {}
