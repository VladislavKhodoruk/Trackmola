import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IconModule } from '@visurel/iconify-angular';

import { TeamListSearchComponent } from './team-list-search.component';
import { TeamListSearchContainer } from './team-list-search.container';

import { ButtonModule } from '../button/button.module';
@NgModule({
  declarations: [TeamListSearchContainer, TeamListSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ButtonModule,
    MatDialogModule,
  ],
  exports: [TeamListSearchContainer],
})
export class TeamListSearchModule {}
