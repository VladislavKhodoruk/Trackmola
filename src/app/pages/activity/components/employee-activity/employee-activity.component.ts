import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-employee-activity',
  templateUrl: './employee-activity.component.html',
  styleUrls: ['./employee-activity.component.scss'],
})
export class EmployeeActivityComponent {
  @Input() period: string;

  @Output() forPushUp = new EventEmitter<string>();

  changeInfo: string;
  lables = ['Week', 'Month', 'Year'];
  changed(event) {
    this.changeInfo = event;
    this.pushPeriodUp();
  }
  pushPeriodUp() {
    this.forPushUp.emit(this.changeInfo);
  }
}
