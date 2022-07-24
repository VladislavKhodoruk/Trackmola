import { Component, Input, OnChanges } from '@angular/core';

import {
  DEFAULT_HOURS_PER_WEEK,
  OVERTIME_TOTAL_CARD,
  REST_HOURS_TOTAL_CARD,
  WORK_HOURS_TOTAL_CARD,
} from '@pages/activity/constants/constants';
import { getTotalCardItem } from '@pages/activity/helpers/helpers';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';

@Component({
  selector: 'app-activity-total-cards',
  styleUrls: ['./activity-total-cards.component.scss'],
  templateUrl: './activity-total-cards.component.html',
})
export class ActivityTotalCardsComponent implements OnChanges {
  @Input() weekReportTime: number;
  taskTracksDuration: number;
  overtime = 0;
  totalCardItems: TotalCardItem[];

  ngOnChanges(): void {
    if (this.weekReportTime > DEFAULT_HOURS_PER_WEEK) {
      this.overtime = this.weekReportTime - DEFAULT_HOURS_PER_WEEK;
    }

    this.totalCardItems = [
      getTotalCardItem(
        WORK_HOURS_TOTAL_CARD,
        this.weekReportTime,
        this.overtime
      ),
      getTotalCardItem(OVERTIME_TOTAL_CARD, this.overtime),
      {
        ...REST_HOURS_TOTAL_CARD,
        value: REST_HOURS_TOTAL_CARD.value - this.overtime,
      },
    ];
  }
}
