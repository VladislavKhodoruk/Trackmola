import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconModule } from '@visurel/iconify-angular';

import { VisitCardComponent } from './visit-card.component';
import { VisitCardContainer } from './visit-card.container';

import { SelectModule } from '../select/select.module';

@NgModule({
  declarations: [VisitCardComponent, VisitCardContainer],
  exports: [VisitCardContainer],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    IconModule,
    CommonModule,
    FormsModule,
    IconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    SelectModule,
  ],
})
export class VisitCardModule {}
