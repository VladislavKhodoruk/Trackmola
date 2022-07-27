/* eslint-disable sort-keys */
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
import { IconifyIcon } from '@iconify/types';

import {
  getInfoFromTaskTracks,
  getTeam,
  getWorksCustomPeriodHours,
} from '@pages/report-constructor/helpers/helpers';
import {
  ExcelData,
  InfoReportConstructorItem,
} from '@pages/report-constructor/interfaces/interfaces';
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
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-report-constructor',
  styleUrls: ['./manager-report-constructor.component.scss'],
  templateUrl: './manager-report-constructor.component.html',
})
export class ManagerReportConstructorComponent implements OnChanges {
  @Input() projects: Project[];
  @Input() period: Period = getPeriod(new Date(), PeriodType.Week);
  @Input() taskTracks: TaskTrack[];
  @Input() users: User[];
  @Input() tasks: Task[];

  @Output() changeStorePeriod: EventEmitter<Period> =
    new EventEmitter<Period>();
  @Output() changeStoreProjectId: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() exportExel: EventEmitter<ExcelData> = new EventEmitter<ExcelData>();

  labels: string[] = [...Object.values(PeriodType)];

  teamProject: User[];

  selectProjectOptions: SelectOptions[];
  currentProjectId: string;
  currentProjectName: string;
  infoFromTaskTracks: InfoReportConstructorItem[];

  readonly TypePeriod = PeriodType;
  periodType: PeriodType = PeriodType.Week;

  readonly checksIcon: IconifyIcon = checksIcon;
  readonly fileXlsIcon: IconifyIcon = fileXls;
  readonly templateIcon: IconifyIcon = templateIcon;
  readonly chartBarIcon: IconifyIcon = chartBar;
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

  exportToExel() {
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

      return {
        taskDuration: infoFromTaskTrack.taskDuration,
        taskName: infoFromTaskTrack.taskName,
        taskPercentageWeek: `${infoFromTaskTrack.taskPercentageWeek}%`,
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
