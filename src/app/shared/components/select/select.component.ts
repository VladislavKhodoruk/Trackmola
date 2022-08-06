import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAT_SELECT_CONFIG } from '@angular/material/select';

import { SelectOptions } from '@shared/interfaces/interfaces';

@Component({
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'customClass' },
    },
  ],
  selector: 'app-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() options: SelectOptions[];
  @Input() selectedValue: string;
  @Output() getSelectedValue: EventEmitter<string> = new EventEmitter<string>();
}
