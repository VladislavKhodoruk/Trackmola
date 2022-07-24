import { Component, Input } from '@angular/core';

import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-manager-dashboard-chart',
  templateUrl: './manager-dashboard-chart.component.html',
  styleUrls: ['./manager-dashboard-chart.component.scss'],
})
export class ManagerDashboardChartComponent {
  @Input() readonly managerProjectsFilter: Project[];
}
