import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import checksIcon from '@iconify/icons-tabler/checks';
import fileXls from '@iconify-icons/ph/file-xls';
import templateIcon from '@iconify/icons-tabler/template';
import chartBar from '@iconify/icons-tabler/chart-bar';
import { Period, Project, SelectOptions } from '@shared/interfaces/interfaces';
import { getPeriod } from '@shared/helpers/helpers';

@Component({
  selector: 'app-manager-report-constructor',
  templateUrl: './manager-report-constructor.component.html',
  styleUrls: ['./manager-report-constructor.component.scss'],
})
export class ManagerReportConstructorComponent implements OnChanges {
  @Input() projects: Project[];

  selectProjectOptions: SelectOptions[];
  currentProjectId: string;

  periodType: 'week' | 'month' = 'week';
  customPeriod = false;
  period = getPeriod(new Date(), this.periodType);

  checksIcon = checksIcon;
  fileXlsIcon = fileXls;
  templateIcon = templateIcon;
  chartBarIcon = chartBar;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.projects && this.projects) {
      this.selectProjectOptions = this.projects.map((project) => ({
        value: project.id,
        viewValue: project.name,
      }));
      this.currentProjectId = this.selectProjectOptions[0]?.value;
    }
  }

  getSelectedValue(currentProjectName: string) {
    this.currentProjectId = currentProjectName;
  }

  getFirstandLastDay(period: Period) {
    this.period = period;
    console.log(new Date(this.period.start));
    console.log(new Date(this.period.end));
  }
}
