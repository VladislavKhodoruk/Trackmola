import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toggle-buttons',
  styleUrls: ['toggle-buttons.component.scss'],
  templateUrl: 'toggle-buttons.component.html',
})
export class ToggleButtonsComponent {
  @Input() labels: string[];
  @Input() checked!: string;
  @Input() buttonClass!: string;

  @Output() changeMode = new EventEmitter<string>();
}
