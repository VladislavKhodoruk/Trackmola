import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfileComponent } from './components/profile.component';
import { ProfileContainer } from './components/profile.container';
import { ProfileRoutes } from './profile.router';

import { ProfileEffects } from './store/profile.effects';
import { ProfileReducer } from './store/profile.reducer';
import { PROFILE_STATE_NAME } from './store/profile.selectors';

import { ButtonModule } from '@shared/components/button/button.module';

@NgModule({
  declarations: [ProfileContainer, ProfileComponent],
  imports: [
    CommonModule,
    ButtonModule,
    EffectsModule.forFeature([ProfileEffects]),
    StoreModule.forFeature(PROFILE_STATE_NAME, ProfileReducer),
    RouterModule.forChild(ProfileRoutes),
  ],
  exports: [RouterModule],
})
export class ProfileModule {}
