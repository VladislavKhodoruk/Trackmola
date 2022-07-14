import { Component, Input } from '@angular/core';

import { UserType } from '@shared/enums/enum';
import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-report-constructor',
  templateUrl: './report-constructor.component.html',
  styleUrls: ['./report-constructor.component.scss'],
})
export class ReportConstructorComponent {
  @Input() userType!: string | null;
  @Input() projects!: Project[];
  types = UserType;
}
