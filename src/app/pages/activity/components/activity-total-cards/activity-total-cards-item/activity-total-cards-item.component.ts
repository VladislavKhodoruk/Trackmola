import { Component, Input } from '@angular/core';

import { TotalCardItem } from '@pages/activity/interfaces/interfaces';

@Component({
  selector: 'app-activity-total-cards-item',
  styleUrls: ['./activity-total-cards-item.component.scss'],
  templateUrl: './activity-total-cards-item.component.html',
})
export class ActivityTotalCardsItemComponent {
  @Input() totalCardItem!: TotalCardItem;
}
