import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOptions } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() options: SelectOptions[];
  @Input() selectedValue: string;
  @Output() getSelectedValue: EventEmitter<string> = new EventEmitter<string>();
}
