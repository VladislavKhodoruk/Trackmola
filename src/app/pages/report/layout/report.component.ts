import { Component, Input } from '@angular/core';

import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-report',
  styleUrls: ['./report.component.scss'],
  templateUrl: './report.component.html',
})
export class ReportComponent {
  @Input() userType!: string | null;
  types = UserType;
}
