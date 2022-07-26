import { Component, Input } from '@angular/core';

import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-team',
  styleUrls: ['./team.component.scss'],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  @Input() userType!: string | null;
  types = UserType;
}
