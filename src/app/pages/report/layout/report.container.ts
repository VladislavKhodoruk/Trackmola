import { Component } from '@angular/core';

@Component({
  selector: 'app-report-container',
  template: '<app-report [userType]="userType"></app-report>',
})
export class ReportContainer {
  readonly userType: string = localStorage.getItem('AuthUserType');
}
