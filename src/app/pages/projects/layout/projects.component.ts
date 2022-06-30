import { Component, Input } from '@angular/core';
import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() readonly userType!: string | null;
  readonly types = UserType;
}
