import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IconModule } from '@visurel/iconify-angular';

import { ReportInputComponent } from './report-input.component';
import { ReportInputContainer } from './repot-input.container';

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
    MatDialogModule,
  ],
  exports: [ReportInputContainer],
})
export class ReportInputModule {}
