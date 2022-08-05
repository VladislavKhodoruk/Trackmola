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
import chartArrows from '@iconify/icons-tabler/chart-arrows';
import chartBar from '@iconify/icons-tabler/chart-bar';
import checksIcon from '@iconify/icons-tabler/checks';
import tableIcon from '@iconify/icons-tabler/table';
import templateIcon from '@iconify/icons-tabler/template';
import { IconifyIcon } from '@iconify/types';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import {
  getInfoFromTaskTracks,
  getTeam,
  getWorksCustomPeriodHours,
} from '@pages/report-constructor/helpers/helpers';
import {
  ExcelData,
  InfoReportConstructorItem,
} from '@pages/report-constructor/interfaces/interfaces';
import { ChartViewMode, ViewMode } from '@pages/report/enums/enum';
import { DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import {
  Period,
  Project,
  SelectOptions,
  TaskTrack,
  User,
  Task,
  GroupBy,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-report-constructor',
  styleUrls: ['./manager-report-constructor.component.scss'],
  templateUrl: './manager-report-constructor.component.html',
})
export class ManagerReportConstructorComponent implements OnChanges {
  @Input() readonly projects: Project[];
  @Input() period: Period = getPeriod(new Date(), PeriodType.Week);
  @Input() readonly taskTracks: TaskTrack[];
  @Input() readonly users: User[];
  @Input() readonly tasks: Task[];
  @Input() readonly viewMode: ViewMode;
  @Input() readonly chartViewMode: ChartViewMode;
  @Input() readonly dateForChart: TaskForManager[];
  @Input() readonly usersInfoByUserId: GroupBy<User>;

  @Output() changeStorePeriod: EventEmitter<Period> =
    new EventEmitter<Period>();
  @Output() changeStoreProjectId: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() exportExel: EventEmitter<ExcelData> = new EventEmitter<ExcelData>();
  @Output() changeViewMode: EventEmitter<ViewMode> =
    new EventEmitter<ViewMode>();
  @Output() changeChartViewMode: EventEmitter<ChartViewMode> =
    new EventEmitter<ChartViewMode>();

  labels: string[] = [PeriodType.Week, PeriodType.Month, PeriodType.Custom];

  teamProject: User[];

  reportConstructorView: typeof ViewMode = ViewMode;
  chartView: typeof ChartViewMode = ChartViewMode;

  selectProjectOptions: SelectOptions[];
  currentProjectId: string;
  currentProjectName: string;
  currentProject: Project;
  infoFromTaskTracks: InfoReportConstructorItem[];

  readonly TypePeriod = PeriodType;
  periodType: PeriodType = PeriodType.Week;

  readonly checksIcon: IconifyIcon = checksIcon;
  readonly fileXlsIcon: IconifyIcon = fileXls;
  readonly templateIcon: IconifyIcon = templateIcon;
  readonly chartBarIcon: IconifyIcon = chartBar;
  readonly iconTable: IconifyIcon = tableIcon;
  readonly iconChartArrows: IconifyIcon = chartArrows;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.projects && this.projects) {
      this.selectProjectOptions = this.projects.map((project) => ({
        value: project.id,
        viewValue: project.name,
      }));
      this.currentProjectId = this.selectProjectOptions[0]?.value;
      this.getSelectedValue(this.currentProjectId);
    }

    this.infoFromTaskTracks = getInfoFromTaskTracks(
      this.taskTracks,
      this.users,
      this.tasks,
      this.periodType === PeriodType.Week
        ? DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK
        : getWorksCustomPeriodHours(this.period)
    );

    this.teamProject = getTeam(this.users, this.infoFromTaskTracks);
  }

  getSelectedValue(currentProjectId: string): void {
    this.currentProjectName = this.projects.find(
      (project) => project.id === currentProjectId
    )?.name;
    this.currentProject = this.projects.find(
      (project) => project.id === currentProjectId
    );
    this.changeStoreProjectId.emit(currentProjectId);
  }

  getFirstandLastDay(period: Period): void {
    this.period = period;
    this.changeStorePeriod.emit(period);
  }

  changePeriod(type: PeriodType): void {
    this.periodType = type;

    this.period =
      this.periodType === PeriodType.Custom
        ? getPeriod(new Date(), PeriodType.Week)
        : getPeriod(new Date(), this.periodType);

    this.getFirstandLastDay(this.period);
  }

  exportToExel(): void {
    const header = this.currentProjectName;
    const team = this.teamProject.map((user) => user.fullName);
    const data = this.infoFromTaskTracks.flatMap((infoFromTaskTrack) => {
      const userNames = infoFromTaskTrack.usersInfo
        .flatMap(
          (track) =>
            `${track.userName} ${track.userPercentageAllDurationTask} %`
        )
        .join('\n');
      const userPositions = infoFromTaskTrack.usersInfo
        .flatMap((track) => track.userPosition)
        .join('\n');

      const taskOvertimeDuration =
        infoFromTaskTrack.taskOvertimeDuration > 0
          ? infoFromTaskTrack.taskOvertimeDuration
          : null;

      return {
        taskDuration: infoFromTaskTrack.taskDuration,
        taskName: infoFromTaskTrack.taskName,
        taskOvertimeDuration: taskOvertimeDuration,
        taskPercentageWeek: infoFromTaskTrack.taskPercentageWeek,
        userNames: userNames,
        userPositions: userPositions,
      };
    });
    this.exportExel.emit({
      data,
      header,
      period: this.period,
      team,
    });
  }
}
