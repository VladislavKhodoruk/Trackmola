import { NgModule } from '@angular/core';
import { ButtonsChooseComponent } from '@shared/components/buttons-choose/buttons-choose.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "@shared/components/button/button.module";

@NgModule({
  declarations: [ButtonsChooseComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ButtonsChooseComponent],
})
export class ButtonsChooseModule {}
