import { Component, Input, OnChanges } from '@angular/core';

import {
  OVERTIME_TOTAL_CARD,
  REST_HOURS_TOTAL_CARD,
  WORK_HOURS_TOTAL_CARD,
} from '@pages/activity/constants/constants';
import { getRestTime, getTotalCardItem } from '@pages/activity/helpers/helpers';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';

@Component({
  selector: 'app-activity-total-cards',
  styleUrls: ['./activity-total-cards.component.scss'],
  templateUrl: './activity-total-cards.component.html',
})
export class ActivityTotalCardsComponent implements OnChanges {
  @Input() reportTime: number;
  @Input() reportOvertime: number;
  @Input() periodType: 'week' | 'month';
  taskTracksDuration: number;
  overtime = 0;
  totalCardItems: TotalCardItem[];

  ngOnChanges(): void {
    this.totalCardItems = [
      getTotalCardItem(
        WORK_HOURS_TOTAL_CARD,
        this.reportTime + this.reportOvertime,
        this.periodType
      ),
      getTotalCardItem(
        OVERTIME_TOTAL_CARD,
        this.reportOvertime,
        this.periodType
      ),
      getTotalCardItem(
        REST_HOURS_TOTAL_CARD,
        getRestTime(this.periodType) - this.reportOvertime,
        this.periodType
      ),
    ];
  }
}
