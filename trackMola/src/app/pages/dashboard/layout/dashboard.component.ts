import { Component, Input } from '@angular/core';
import { UserType } from 'src/app/shared/enums/enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() userType!: string | null;
  employee = UserType.Employee;
  cto = UserType.CTO;
  manager = UserType.Manager;
  admin = UserType.Admin;
}
