import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two-buttons-choose',
  templateUrl: 'two-button.component.html',
  styleUrls: ['two-button.component.scss'],
})
export class TwoButtonComponent {
  @Input() leftLabel!: string;
  @Input() rightLabel!: string;
  @Input() classOfLeftButton!: string;
  @Input() classOfRightButton!: string;
}
