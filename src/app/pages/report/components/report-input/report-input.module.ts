import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ReportInputContainer } from './repot-input.container';
import { IconModule } from '@visurel/iconify-angular';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ReportInputComponent } from './report-input.component';
import { ButtonModule } from '@shared/components/button/button.module';

@NgModule({
  declarations: [ReportInputComponent, ReportInputContainer],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    IconModule,
    ButtonModule,
  ],
  exports: [ReportInputContainer],
})
export class ReportInputModule {}
