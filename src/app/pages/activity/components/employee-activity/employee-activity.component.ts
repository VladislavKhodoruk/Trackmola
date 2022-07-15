import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-employee-activity',
  templateUrl: './employee-activity.component.html',
  styleUrls: ['./employee-activity.component.scss'],
})
export class EmployeeActivityComponent {
  @Input() period: string;

  @Output() selectPeriod = new EventEmitter<string>();

  labels = ['Week', 'Month'];
}
