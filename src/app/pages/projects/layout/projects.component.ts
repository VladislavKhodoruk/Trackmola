import { Component, Input } from '@angular/core';
import angleRight from '@iconify/icons-uil/angle-right';
import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() readonly projectByRoute: Project;

  readonly iconAngleRight = angleRight;
}
