import { Component, Input } from '@angular/core';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';

@Component({
  selector: 'app-activity-total-cards-item',
  templateUrl: './activity-total-cards-item.component.html',
  styleUrls: ['./activity-total-cards-item.component.scss'],
})
export class ActivityTotalCardsItemComponent {
  @Input() totalCardItem!: TotalCardItem;
}
