import { NgModule } from '@angular/core';
import { ToggleButtonsComponent } from '@shared/components/toggle-buttons/toggle-buttons.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@shared/components/button/button.module';
@NgModule({
  declarations: [ToggleButtonsComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ToggleButtonsComponent],
})
export class ToggleButtonsModule {}
