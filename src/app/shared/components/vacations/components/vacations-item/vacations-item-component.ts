import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vacation-item-component',
  templateUrl: 'vacations-item-component.html',
  styleUrls: ['vacations-item-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacationsItemComponent {}
