import { Component } from '@angular/core';

@Component({
  selector: 'app-project-efficiency-component',
  templateUrl: 'project-efficiency.component.html',
  styleUrls: ['project-efficiency.scss'],
})
export class ProjectEfficiencyComponent {
  efficiency = {
    total: 2,
    complited: 1,
    shortages: 4,
    overtimes: 0,
  };
}
