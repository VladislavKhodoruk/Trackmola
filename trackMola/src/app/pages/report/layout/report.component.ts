import { Component, Input } from '@angular/core';
import { UserType } from 'src/app/shared/enums/enum';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  @Input() userType!: string | null;
  employee = UserType.Employee;
  cto = UserType.CTO;
  manager = UserType.Manager;
  admin = UserType.Admin;
}
