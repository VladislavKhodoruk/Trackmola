import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import fireIcon from '@iconify/icons-emojione/fire';
import sortDescending from '@iconify/icons-tabler/sort-descending';

import { IconifyIcon } from '@iconify/types';

import { AdminReportConstructorMode } from '@pages/report-constructor/enums/enums';

import { getSortInfoReportConstructor } from '@pages/report-constructor/helpers/helpers';

import {
  InfoFromTaskTracksForTable,
  InfoReportConstructorItem,
  InfoReportConstructorUserItem,
  SortOption,
} from '@pages/report-constructor/interfaces/interfaces';
import { TableHeadItem } from '@pages/report-constructor/models/models';
import { UserType } from '@shared/enums/enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report-constructor-table',
  styleUrls: ['./report-constructor-table.component.scss'],
  templateUrl: './report-constructor-table.component.html',
})
export class ReportConstructorTableComponent implements OnChanges {
  @Input() infoFromTaskTracks: InfoReportConstructorItem[];
  @Input() infoFromUsers: InfoReportConstructorUserItem[];
  @Input() mode: AdminReportConstructorMode =
    AdminReportConstructorMode.Projects;
  infoFromTaskTracksForTable: InfoFromTaskTracksForTable[];
  total: string[];
  totalUsers: string[];

  readonly iconFire: IconifyIcon = fireIcon;
  readonly sortDescendingIcon: IconifyIcon = sortDescending;
  readonly userTypes = UserType;
  readonly adminReportConstructorMode = AdminReportConstructorMode;

  readonly tableHeadItems = [
    new TableHeadItem('deliverables', 'taskName', 'string', true),
    new TableHeadItem('resource', 'userPositions', 'string', false),
    new TableHeadItem('hours spend', 'taskDuration', 'number', true),
    new TableHeadItem('overtimes', 'taskOvertimeDuration', 'number', true),
    new TableHeadItem('percentage', 'taskPercentageWeek', 'number', true),
    new TableHeadItem('team', 'userNames', 'string', false),
  ];

  readonly AdminTableHeadItems = [
    new TableHeadItem('date', 'date', 'string', true),
    new TableHeadItem('resource', 'userPositions', 'string', false),
    new TableHeadItem('hours', 'taskDuration', 'number', true),
    new TableHeadItem('overtimes', 'taskOvertimeDuration', 'number', true),
    new TableHeadItem('note', 'note', 'number', true),
    new TableHeadItem('projects', 'projects', 'string', false),
  ];

  selectedSort: SortOption = {
    ascendingSort: true,
    columnName: 'taskName',
  };

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.infoFromTaskTracks.sort((a, b) =>
      a[this.selectedSort.columnName] > b[this.selectedSort.columnName] ? 1 : -1
    );
    this.setTableFields();
  }

  setTableFields(): void {
    this.infoFromTaskTracksForTable = this.infoFromTaskTracks.flatMap(
      (infoFromTaskTrack) => {
        const userNames = infoFromTaskTrack.usersInfo.map(
          (track) =>
            `${track.userName} ${track.userPercentageAllDurationTask} %`
        );
        const userPositions = infoFromTaskTrack.usersInfo.map(
          (track) => track.userPosition
        );

        return {
          taskDuration: infoFromTaskTrack.taskDuration,
          taskName: infoFromTaskTrack.taskName,
          taskOvertimeDuration: infoFromTaskTrack.taskOvertimeDuration,
          taskPercentageWeek: infoFromTaskTrack.taskPercentageWeek,
          userNames: userNames,
          userPositions: userPositions,
        };
      }
    );
    const totalTaskDuration = `${this.infoFromTaskTracksForTable.reduce(
      (acc, item) => (acc += item.taskDuration),
      0
    )}`;
    const totalTaskOvertimeDuration = `${this.infoFromTaskTracksForTable.reduce(
      (acc, item) => (acc += item.taskOvertimeDuration),
      0
    )}`;
    const totalTaskPercentageWeek = `${this.infoFromTaskTracksForTable
      .reduce((acc, item) => (acc += +item.taskPercentageWeek), 0)
      .toFixed(2)}`;
    this.total = [
      'Total',
      '',
      totalTaskDuration,
      totalTaskOvertimeDuration,
      totalTaskPercentageWeek,
      '',
    ];
    const overtimesTotal = `${this.infoFromUsers?.reduce(
      (acc, item) => (acc += item.overtimes ? item.overtimes : 0),
      0
    )}`;
    const durationTotal = `${this.infoFromUsers?.reduce(
      (acc, item) => (acc += item.hours),
      0
    )}`;
    this.totalUsers = ['Total', '', durationTotal, overtimesTotal, '', '', ''];
  }

  changeSortOption(
    columnName: string,
    columnType: string,
    sortMode: boolean
  ): void {
    if (!sortMode) {
      return;
    }
    this.selectedSort.ascendingSort =
      this.selectedSort.columnName === columnName
        ? !this.selectedSort.ascendingSort
        : true;

    this.selectedSort.columnName = columnName;

    getSortInfoReportConstructor(
      this.infoFromTaskTracksForTable,
      this.selectedSort,
      columnType
    );
  }
}
