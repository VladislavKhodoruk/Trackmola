import { Component, Input } from '@angular/core';

import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  @Input() userType!: string | null;
  types = UserType;
}
