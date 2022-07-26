import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@shared/components/button/button.module';
import { ToggleButtonsComponent } from '@shared/components/toggle-buttons/toggle-buttons.component';
@NgModule({
  declarations: [ToggleButtonsComponent],
  exports: [ToggleButtonsComponent],
  imports: [CommonModule, ButtonModule],
})
export class ToggleButtonsModule {}
