import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SelectOptions } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() options: SelectOptions[];
  @Input() selectedValue: string;
  @Output() getSelectedValue: EventEmitter<string> = new EventEmitter<string>();
}
