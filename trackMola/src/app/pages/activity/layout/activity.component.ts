import { Component, Input } from '@angular/core';
import { UserType } from 'src/app/shared/enums/enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  @Input() userType!: string | null;
  employee = UserType.Employee;
  cto = UserType.CTO;
  manager = UserType.Manager;
  admin = UserType.Admin;
}
