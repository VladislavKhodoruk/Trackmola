import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-activity',
  templateUrl: './employee-activity.component.html',
  styleUrls: ['./employee-activity.component.scss'],
})
export class EmployeeActivityComponent {
  lables = ['Week', 'Month'];
  classes = [
    'button-halfOfPrimary button-d',
    'button-halfOfPrimary button-d',
    'button-halfOfPrimary button-d',
  ];
}
