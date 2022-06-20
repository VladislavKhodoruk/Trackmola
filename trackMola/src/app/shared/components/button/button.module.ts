import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, RouterModule, IconModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
