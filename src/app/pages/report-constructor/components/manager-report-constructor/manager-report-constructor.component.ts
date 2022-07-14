import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import fileXls from '@iconify-icons/ph/file-xls.js';
import chartBar from '@iconify/icons-tabler/chart-bar';
import checksIcon from '@iconify/icons-tabler/checks';
import templateIcon from '@iconify/icons-tabler/template';

import {
  getInfoFromTaskTracks,
  getWorksCustomPeriodHours,
} from '@pages/report-constructor/helpers/helpers';
import { InfoReportConstructorItem } from '@pages/report-constructor/interfaces/interfaces';
import { DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK } from '@shared/constants/constants';
import { getPeriod } from '@shared/helpers/helpers';
import {
  Period,
  Project,
  SelectOptions,
  TaskTrack,
  User,
  Task,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-manager-report-constructor',
  templateUrl: './manager-report-constructor.component.html',
  styleUrls: ['./manager-report-constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerReportConstructorComponent implements OnChanges {
  @Input() projects: Project[];
  @Input() period = getPeriod(new Date(), 'week');
  @Input() taskTracks: TaskTrack[];
  @Input() users: User[];
  @Input() tasks: Task[];

  @Output() changeStorePeriod = new EventEmitter();
  @Output() changeStoreProjectId = new EventEmitter();

  selectProjectOptions: SelectOptions[];
  currentProjectId: string;
  infoFromTaskTracks: InfoReportConstructorItem[];

  periodType = 'week';

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
      this.getSelectedValue(this.currentProjectId);
    }
    switch (this.periodType) {
      case 'week':
        this.infoFromTaskTracks = getInfoFromTaskTracks(
          this.taskTracks,
          this.users,
          this.tasks,
          DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK
        );
        break;
      case 'month':
        this.infoFromTaskTracks = getInfoFromTaskTracks(
          this.taskTracks,
          this.users,
          this.tasks,
          getWorksCustomPeriodHours(this.period)
        );
        break;
      case 'custom':
        this.infoFromTaskTracks = getInfoFromTaskTracks(
          this.taskTracks,
          this.users,
          this.tasks,
          getWorksCustomPeriodHours(this.period)
        );
        break;
    }
  }

  getSelectedValue(currentProjectId: string) {
    this.changeStoreProjectId.emit(currentProjectId);
  }

  getFirstandLastDay(period: Period) {
    this.period = period;
    this.changeStorePeriod.emit(period);
  }

  changePeriod(type: string) {
    this.periodType = type;

    if (this.periodType === 'custom') {
      this.period = getPeriod(new Date(), 'week');
      this.getFirstandLastDay(this.period);
      return;
    }
    this.period = getPeriod(new Date(), this.periodType);
    this.getFirstandLastDay(this.period);
  }
}
