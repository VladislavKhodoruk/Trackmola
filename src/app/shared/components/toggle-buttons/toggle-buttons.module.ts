import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '@shared/components/button/button.module';
import { ToggleButtonsComponent } from '@shared/components/toggle-buttons/toggle-buttons.component';
@NgModule({
  declarations: [ToggleButtonsComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ToggleButtonsComponent],
})
export class ToggleButtonsModule {}
