import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import sortDescending from '@iconify/icons-tabler/sort-descending';

import { getSortInfoReportConstructor } from '@pages/report-constructor/helpers/helpers';
import {
  InfoFromTaskTracksForTable,
  InfoReportConstructorItem,
  SortOption,
} from '@pages/report-constructor/interfaces/interfaces';

@Component({
  selector: 'app-report-constructor-table',
  templateUrl: './report-constructor-table.component.html',
  styleUrls: ['./report-constructor-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportConstructorTableComponent implements OnChanges {
  @Input() infoFromTaskTracks: InfoReportConstructorItem[];
  sortDescendingIcon = sortDescending;
  infoFromTaskTracksForTable: InfoFromTaskTracksForTable[];

  selectedSort: SortOption = {
    columnName: 'deliverables',
    ascendingSort: true,
  };

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.infoFromTaskTracks.sort((a, b) => {
      if (a.taskName < b.taskName) {
        return -1;
      }
      if (a.taskName > b.taskName) {
        return 1;
      }
    });
    this.setTableFields();
  }

  setTableFields() {
    this.infoFromTaskTracksForTable = this.infoFromTaskTracks
      .map((infoFromTaskTrack) => {
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
      })
      .flat();
  }

  changeSortOption(sortOption: string) {
    switch (sortOption) {
      case 'deliverables':
        if (this.selectedSort.columnName === 'deliverables') {
          this.selectedSort.ascendingSort = !this.selectedSort.ascendingSort;
          getSortInfoReportConstructor(
            this.infoFromTaskTracksForTable,
            this.selectedSort
          );
          return;
        }
        if (this.selectedSort.columnName !== 'deliverables') {
          this.selectedSort.columnName = 'deliverables';
          this.selectedSort.ascendingSort = true;
          getSortInfoReportConstructor(
            this.infoFromTaskTracksForTable,
            this.selectedSort
          );
          return;
        }
        break;
      case 'hours spend':
        if (this.selectedSort.columnName === 'hours spend') {
          this.selectedSort.ascendingSort = !this.selectedSort.ascendingSort;
          getSortInfoReportConstructor(
            this.infoFromTaskTracksForTable,
            this.selectedSort
          );
          return;
        }
        if (this.selectedSort.columnName !== 'hours spend') {
          this.selectedSort.columnName = 'hours spend';
          this.selectedSort.ascendingSort = true;
          getSortInfoReportConstructor(
            this.infoFromTaskTracksForTable,
            this.selectedSort
          );
          return;
        }
        break;
      case 'percentage':
        if (this.selectedSort.columnName === 'percentage') {
          this.selectedSort.ascendingSort = !this.selectedSort.ascendingSort;
          getSortInfoReportConstructor(
            this.infoFromTaskTracksForTable,
            this.selectedSort
          );
          return;
        }
        if (this.selectedSort.columnName !== 'percentage') {
          this.selectedSort.columnName = 'percentage';
          this.selectedSort.ascendingSort = true;
          getSortInfoReportConstructor(
            this.infoFromTaskTracksForTable,
            this.selectedSort
          );
          return;
        }
        break;
    }
  }
}
