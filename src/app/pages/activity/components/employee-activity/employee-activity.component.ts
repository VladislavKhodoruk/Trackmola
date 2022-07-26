import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PeriodType } from '@shared/enums/enum';

@Component({
  selector: 'app-employee-activity',
  styleUrls: ['./employee-activity.component.scss'],
  templateUrl: './employee-activity.component.html',
})
export class EmployeeActivityComponent {
  @Input() period: string;

  @Output() selectPeriod = new EventEmitter<PeriodType>();

  labels = [PeriodType.Week, PeriodType.Month];
}
