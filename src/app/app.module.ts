import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IconModule } from '@visurel/iconify-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationEffects } from './pages/authorization/store/authorization.effects';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { TeamListSearchComponent } from './shared/components/team-list-search/team-list-search.component';
import { CommonEffects } from './store/common/common.effects';

import { trackMolaReducer } from './store/trackMola.state';

import { ReportInputModule } from '@shared/components/report-input/report-input.module';
import { CustomSerializer } from '@store/router/custom-serializer';
import { environment } from 'environments/environment';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    SidebarModule,
    EffectsModule.forRoot([AuthorizationEffects, CommonEffects]),
    StoreModule.forRoot(trackMolaReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ReportInputModule,
  ],
  providers: [],
})
export class AppModule {}
