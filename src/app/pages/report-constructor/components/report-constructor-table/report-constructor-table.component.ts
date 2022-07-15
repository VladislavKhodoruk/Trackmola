import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import sortDescending from '@iconify/icons-tabler/sort-descending';
import { IconifyIcon } from '@iconify/types';

import { getSortInfoReportConstructor } from '@pages/report-constructor/helpers/helpers';

import {
  InfoFromTaskTracksForTable,
  InfoReportConstructorItem,
  SortOption,
} from '@pages/report-constructor/interfaces/interfaces';
import { TableHeadItem } from '@pages/report-constructor/models/models';

@Component({
  selector: 'app-report-constructor-table',
  templateUrl: './report-constructor-table.component.html',
  styleUrls: ['./report-constructor-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportConstructorTableComponent implements OnChanges {
  @Input() infoFromTaskTracks: InfoReportConstructorItem[];
  sortDescendingIcon: IconifyIcon = sortDescending;
  infoFromTaskTracksForTable: InfoFromTaskTracksForTable[];

  tableHeadItems = [
    new TableHeadItem('deliverables', 'taskName', 'string', true),
    new TableHeadItem('resource', 'userPositions', 'string', false),
    new TableHeadItem('hours spend', 'taskDuration', 'number', true),
    new TableHeadItem('percentage', 'taskPercentageWeek', 'number', true),
    new TableHeadItem('team', 'userNames', 'string', false),
  ];

  selectedSort: SortOption = {
    columnName: 'taskName',
    ascendingSort: true,
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
          taskName: infoFromTaskTrack.taskName,
          taskDuration: infoFromTaskTrack.taskDuration,
          taskPercentageWeek: infoFromTaskTrack.taskPercentageWeek,
          userNames: userNames,
          userPositions: userPositions,
        };
      }
    );
  }

  changeSortOption(columnName: string, columnType: string) {
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
