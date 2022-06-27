import { Component, Input } from '@angular/core';
import angleRight from '@iconify/icons-uil/angle-right';
import { Project } from '@pages/projects/interfaces/interfaces';

@Component({
  selector: 'app-employee-projects',
  templateUrl: './employee-projects.component.html',
  styleUrls: ['./employee-projects.component.scss'],
})
export class EmployeeProjectsComponent {
  @Input() readonly selectedProject!: Project;

  readonly iconAngleRight = angleRight;
}
