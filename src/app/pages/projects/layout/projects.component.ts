import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import angleRight from '@iconify/icons-uil/angle-right';
import { Store } from '@ngrx/store';

import { GroupBy, Project, User } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;

  readonly iconAngleRight = angleRight;
}
