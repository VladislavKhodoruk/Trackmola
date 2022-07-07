import { NgModule } from '@angular/core';
import { TwoButtonComponent } from '@shared/components/two-Buttons-choose/two-button.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "@shared/components/button/button.module";

@NgModule({
  declarations: [TwoButtonComponent],
  imports: [CommonModule, ButtonModule],
  exports: [TwoButtonComponent],
})
export class TwoButtonModule {}
