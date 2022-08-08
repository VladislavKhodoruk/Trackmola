import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IconModule } from '@visurel/iconify-angular';

import { VacationComponent } from './layout/vacation/vacation.component';
import { VacationContainer } from './layout/vacation/vacation.container';
import { SearchUsersPipe } from './pipes/searchUsers.pipe';
import { VacationsEffects } from './store/vacations.effects';
import { VacationsReducer } from './store/vacations.reducer';
import { VACATIONS_STATE_NAME } from './store/vacations.selectors';
import { VacationRoutes } from './vacations.router';

import { ButtonModule } from '@shared/components/button/button.module';
import { HolidaysModule } from '@shared/components/holiday/holidays.module';

@NgModule({
  declarations: [VacationContainer, VacationComponent, SearchUsersPipe],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    EffectsModule.forFeature([VacationsEffects]),
    StoreModule.forFeature(VACATIONS_STATE_NAME, VacationsReducer),
    RouterModule.forChild(VacationRoutes),
    ButtonModule,
    HolidaysModule,
  ],
})
export class VacationsModule {}
