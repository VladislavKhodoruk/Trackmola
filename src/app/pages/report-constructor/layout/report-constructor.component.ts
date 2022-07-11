import { Component, Input } from '@angular/core';
import { UserType } from '@shared/enums/enum';

@Component({
  selector: 'app-report-constructor',
  templateUrl: './report-constructor.component.html',
  styleUrls: ['./report-constructor.component.scss'],
})
export class ReportConstructorComponent {
  @Input() userType!: string | null;
  types = UserType;
}
