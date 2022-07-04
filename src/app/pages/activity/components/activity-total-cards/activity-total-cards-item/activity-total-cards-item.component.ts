import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TotalCardItem } from '@pages/activity/interfaces/interfaces';

@Component({
  selector: 'app-activity-total-cards-item',
  templateUrl: './activity-total-cards-item.component.html',
  styleUrls: ['./activity-total-cards-item.component.scss'],
})
export class ActivityTotalCardsItemComponent implements OnInit, OnChanges {
  @Input() totalCardItem!: TotalCardItem;

  progressBar: number;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.progressBar =
      (this.totalCardItem?.value / this.totalCardItem?.numberWeekHours) * 100;
  }

  ngOnInit(): void {
  }

}
