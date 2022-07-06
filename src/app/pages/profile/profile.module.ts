import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutes } from './profile.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileReducer } from './store/profile.reducer';
import { PROFILE_STATE_NAME } from './store/profile.selectors';
import { ProfileComponent } from './components/profile.component';
import { ProfileContainer } from './components/profile.container';

import { ButtonModule } from '@shared/components/button/button.module';
import { ProfileEffects } from './store/profile.effects';

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
export class ProfileModule { }
