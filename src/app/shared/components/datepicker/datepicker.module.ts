import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatFormFieldModule } from '@angular/material/form-field';

import { DatepickerComponent } from './datepicker.component';

import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  exports: [DatepickerComponent],
})
export class DatepickerModule {}
