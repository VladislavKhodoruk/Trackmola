import { Component } from '@angular/core';

@Component({
  selector: 'app-project-efficiency-component',
  styleUrls: ['project-efficiency.scss'],
  templateUrl: 'project-efficiency.component.html',
})
export class ProjectEfficiencyComponent {
  efficiency = {
    complited: 1,
    overtimes: 0,
    shortages: 4,
    total: 2,
  };
}
