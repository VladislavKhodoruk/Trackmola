import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconifyIcon } from '@iconify/types';
import check from '@iconify/icons-tabler/check';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() buttonClass!: string;
  @Input() label!: string;
  @Input() disabled!: boolean | null;
  @Input() icon!: IconifyIcon;
  @Input() iconWidth!: string;
  @Input() iconHeight!: string;

  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  readonly iconCheck = check;
}
