import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  getRestMonthDefaultHours,
  getRestTime,
  getWorksMonthDefaultHours,
} from '@pages/activity/helpers/helpers';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';

@Component({
  selector: 'app-activity-total-cards',
  templateUrl: './activity-total-cards.component.html',
  styleUrls: ['./activity-total-cards.component.scss'],
})
export class ActivityTotalCardsComponent implements OnChanges {
  @Input() weekReportTime: number;
  taskTracksDuration: number;
  overtime = 0;
  totalCardItems: TotalCardItem[];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.weekReportTime > 40) {
      this.overtime = this.weekReportTime - 40;
    }

    this.totalCardItems = [
      {
        value: this.weekReportTime,
        title: 'Work hours',
        img: 'assets/img/activity/work-hours.svg',
        backgoundColor: 'var(--white)',
        progressBarColor: 'var(--primary)',
        numberWeekHours: 40,
        numberMonthHours: getWorksMonthDefaultHours(),
      },
      {
        value: this.overtime,
        title: 'Overtimes',
        img: 'assets/img/activity/overtimes.svg',
        backgoundColor: 'var(--white)',
        progressBarColor: 'var(--blue1)',
        numberWeekHours: 3,
        numberMonthHours: 12,
      },
      {
        value: getRestTime('week'),
        title: 'Rest hours',
        img: 'assets/img/activity/rest-hours.svg',
        backgoundColor: 'var(--blue1)',
        progressBarColor: 'var(--yellow3)',
        numberWeekHours: 128,
        numberMonthHours: getRestMonthDefaultHours(),
      },
    ];
  }
}
