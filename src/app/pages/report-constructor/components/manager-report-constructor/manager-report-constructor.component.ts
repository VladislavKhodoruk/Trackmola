/* eslint-disable no-console */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import checksIcon from '@iconify/icons-tabler/checks';
import fileXls from '@iconify-icons/ph/file-xls';
import templateIcon from '@iconify/icons-tabler/template';
import chartBar from '@iconify/icons-tabler/chart-bar';
import {
  Period,
  Project,
  SelectOptions,
  TaskTrack,
  User,
  Task,
} from '@shared/interfaces/interfaces';
import { getPeriod } from '@shared/helpers/helpers';
import { getInfoFromTaskTracks } from '@pages/report-constructor/helpers/helpers';

@Component({
  selector: 'app-manager-report-constructor',
  templateUrl: './manager-report-constructor.component.html',
  styleUrls: ['./manager-report-constructor.component.scss'],
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.currentProjectId = this.selectProjectOptions[0]?.value;
      this.getSelectedValue(this.currentProjectId);
    }
    getInfoFromTaskTracks(this.taskTracks, this.users, this.tasks);
  }

  getSelectedValue(currentProjectId: string) {
    this.changeStoreProjectId.emit(currentProjectId);
  }

  getFirstandLastDay(period: Period) {
    this.period = period;
    this.changeStorePeriod.emit(period);
    console.log(new Date(period.start));
    console.log(new Date(period.end));
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
