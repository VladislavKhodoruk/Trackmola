import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-buttons-choose',
  templateUrl: 'buttons-choose.component.html',
  styleUrls: ['buttons-choose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsChooseComponent implements OnChanges {
  @Input() lables: string[];
  @Input() receiving!: string;
  @Output() changed = new EventEmitter<string>();
  checkedValue: string;
  ngOnChanges(changes: SimpleChanges) {
    this.checkedValue = this.receiving;
  }
  chooseButton(button: string) {
    this.checkedValue = button;
    this.changed.emit(button);
  }
}
