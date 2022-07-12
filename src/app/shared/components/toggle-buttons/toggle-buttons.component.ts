import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: 'toggle-buttons.component.html',
  styleUrls: ['toggle-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonsComponent {
  @Input() labels: string[];
  @Input() getInit!: string;

  @Output() catchPeriod = new EventEmitter<string>();

  chooseButton(button: string): void {
    this.getInit = button;
    this.catchPeriod.emit(button);
  }
}
