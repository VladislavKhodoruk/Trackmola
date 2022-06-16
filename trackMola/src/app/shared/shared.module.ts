import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarContainer } from './components/sidebar/sidebar.container';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [SidebarContainer, SidebarComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IconModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarContainer,
    SidebarComponent,
    IconModule,
  ],
})
export class SharedModule {}
