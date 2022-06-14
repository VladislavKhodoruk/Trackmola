import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutes } from './profile.router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileReducer } from './store/profile.reducer';
import { PROFILE_STATE_NAME } from './store/profile.selectors';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CtoProfileComponent } from './components/cto-profile/cto-profile.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';

@NgModule({
  declarations: [
    AdminProfileComponent,
    CtoProfileComponent,
    EmployeeProfileComponent,
    ManagerProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(PROFILE_STATE_NAME, ProfileReducer),
    RouterModule.forChild(ProfileRoutes),
  ],
  exports: [RouterModule],
})
export class ProfileModule {}
