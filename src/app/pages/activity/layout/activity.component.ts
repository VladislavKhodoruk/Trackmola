import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PeriodType, UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-activity',
  styleUrls: ['./activity.component.scss'],
  templateUrl: './activity.component.html',
})
export class ActivityComponent {
  @Input() userType!: string | null;

  @Input() period: string;

  @Output() selectPeriod = new EventEmitter<PeriodType>();

  types = UserType;
  labels = [PeriodType.Week, PeriodType.Month];
}
