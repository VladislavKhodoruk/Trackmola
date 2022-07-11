import { Component } from '@angular/core';
import { HALF_OF_PRIMARY_BUTTON } from "@pages/activity/constants/constants";

@Component({
  selector: 'app-employee-activity',
  templateUrl: './employee-activity.component.html',
  styleUrls: ['./employee-activity.component.scss'],
})
export class EmployeeActivityComponent {
  lables = ['Week', 'Month'];
  classes = [
    HALF_OF_PRIMARY_BUTTON.dSize,
    HALF_OF_PRIMARY_BUTTON.dSize,
    HALF_OF_PRIMARY_BUTTON.dSize,
  ];
}
