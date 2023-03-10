import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';

import { SidebarComponent } from './sidebar.component';
import { SidebarContainer } from './sidebar.container';

@NgModule({
  declarations: [SidebarContainer, SidebarComponent],
  exports: [SidebarContainer],
  imports: [CommonModule, RouterModule, IconModule],
})
export class SidebarModule {}
