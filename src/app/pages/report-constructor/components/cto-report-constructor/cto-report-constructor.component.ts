import {
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
import { AdminReportConstructorMode } from '@pages/report-constructor/enums/enums';

import {
  getDates,
  getInfoFromTaskTracks,
  getTeam,
  getWorksCustomPeriodHours,
} from '@pages/report-constructor/helpers/helpers';
import {
  ExcelData,
  InfoReportConstructorItem,
  InfoReportConstructorUserItem,
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
  selector: 'app-cto-report-constructor',
  styleUrls: ['./cto-report-constructor.component.scss'],
  templateUrl: './cto-report-constructor.component.html',
})
export class CtoReportConstructorComponent implements OnChanges {
  @Input() readonly projects: Project[];
  @Input() period: Period = getPeriod(new Date(), PeriodType.Week);
  @Input() readonly taskTracks: TaskTrack[];
  @Input() readonly users: User[];
  @Input() readonly tasks: Task[];
  @Input() readonly viewMode: ViewMode;
  @Input() readonly chartViewMode: ChartViewMode;
  @Input() readonly dateForChart: TaskForManager[];
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly projectsInfoByProjectId: GroupBy<Project>;
  @Input() readonly taskTracksGroupByDate: GroupBy<TaskTrack[]>;

  @Output() changeStorePeriod: EventEmitter<Period> =
    new EventEmitter<Period>();
  @Output() changeStoreProjectId: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() changeStoreUserId: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() exportExel: EventEmitter<ExcelData> = new EventEmitter<ExcelData>();
  @Output() changeViewMode: EventEmitter<ViewMode> =
    new EventEmitter<ViewMode>();
  @Output() changeChartViewMode: EventEmitter<ChartViewMode> =
    new EventEmitter<ChartViewMode>();

  periodLabels: string[] = [
    PeriodType.Week,
    PeriodType.Month,
    PeriodType.Custom,
  ];

  modeLabels: string[] = [...Object.values(AdminReportConstructorMode)];

  teamProject: User[];

  reportConstructorView: typeof ViewMode = ViewMode;
  chartView: typeof ChartViewMode = ChartViewMode;

  selectProjectOptions: SelectOptions[];
  currentProjectId: string;
  currentProjectName: string;
  currentProject: Project;
  selectEmployeeOptions: SelectOptions[];
  currentEmployeeId: string;
  currentEmployeeName: string;
  currentEmployee: User;
  infoFromTaskTracks: InfoReportConstructorItem[];
  infoFromUsers: InfoReportConstructorUserItem[];

  readonly TypePeriod = PeriodType;
  readonly adminReportConstructorMode = AdminReportConstructorMode;
  periodType: PeriodType = PeriodType.Week;
  mode: AdminReportConstructorMode = AdminReportConstructorMode.User;

  readonly checksIcon: IconifyIcon = checksIcon;
  readonly fileXlsIcon: IconifyIcon = fileXls;
  readonly templateIcon: IconifyIcon = templateIcon;
  readonly chartBarIcon: IconifyIcon = chartBar;
  readonly iconTable: IconifyIcon = tableIcon;
  readonly iconChartArrows: IconifyIcon = chartArrows;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users && this.users) {
      this.selectEmployeeOptions = this.users.map((user) => ({
        value: user.id,
        viewValue: user.fullName,
      }));
      this.currentEmployeeId = this.selectEmployeeOptions[0]?.value;
      this.getSelectedUserValue(this.currentEmployeeId);
    }

    if (changes.projects && this.projects) {
      this.selectProjectOptions = this.projects.map((project) => ({
        value: project.id,
        viewValue: project.name,
      }));
      this.currentProjectId = this.selectProjectOptions[0]?.value;
      this.getSelectedProjectValue(this.currentProjectId);
    }

    this.infoFromTaskTracks = getInfoFromTaskTracks(
      this.taskTracks,
      this.users,
      this.tasks,
      this.periodType === PeriodType.Week
        ? DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK
        : getWorksCustomPeriodHours(this.period)
    );

    this.infoFromUsers = getDates(this.period).reduce(
      (acc: InfoReportConstructorUserItem[], date) => {
        const taskTracks = this.taskTracksGroupByDate[date];
        const hours = taskTracks?.reduce(
          (result, taskTrack) => (result += taskTrack.duration),
          0
        );
        const overtimes = taskTracks?.reduce(
          (result, taskTrack) => (result += taskTrack.overtimeDuration),
          0
        );
        const projects: Project[] = taskTracks?.reduce(
          (result: Project[], taskTrack: TaskTrack) =>
            result.some((item) => taskTrack.projectId === item.id)
              ? result
              : [...result, this.projectsInfoByProjectId[taskTrack.projectId]],
          []
        );
        return [
          ...acc,
          {
            date: new Date(date),
            hours,
            notes: '',
            overtimes,
            position: this.currentEmployee.position,
            projects,
          },
        ];
      },
      []
    );
    this.teamProject = getTeam(this.users, this.infoFromTaskTracks);
  }

  getSelectedUserValue(currentEmployeeId: string): void {
    this.currentEmployeeName = this.users.find(
      (user) => user.id === currentEmployeeId
    )?.fullName;
    this.currentEmployee = this.users.find(
      (user) => user.id === currentEmployeeId
    );
    this.changeStoreUserId.emit(currentEmployeeId);
  }

  getSelectedProjectValue(currentProjectId: string): void {
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

  changeMode(type: AdminReportConstructorMode): void {
    this.mode = type;
  }

  exportToExel(): void {
    const header = this.currentEmployeeName;
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
