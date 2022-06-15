import { Component, Input } from '@angular/core';
import { UserType } from 'src/app/shared/enums/enum';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() userType!: string | null;
  employee = UserType.Employee;
  cto = UserType.CTO;
  manager = UserType.Manager;
  admin = UserType.Admin;
}
