import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-activity',
  templateUrl: './employee-activity.component.html',
  styleUrls: ['./employee-activity.component.scss'],
})
export class EmployeeActivityComponent {
  checked = true;
  lables = ['Week', 'Month', 'Year'];
  classes = [
    'button-primary button-d choose-item-left ',
    'button-halfOfPrimary button-d choose-item',
    'button-halfOfPrimary button-d choose-item-right',
  ];

}
