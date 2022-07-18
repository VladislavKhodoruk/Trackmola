import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Vacations } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-vacation-item-component',
  templateUrl: 'vacations-item-component.html',
  styleUrls: ['vacations-item-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacationsItemComponent {
  @Input() vacation: Vacations;
}
