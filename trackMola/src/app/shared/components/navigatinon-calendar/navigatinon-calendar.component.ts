import { Component, EventEmitter, Input, Output } from '@angular/core';
import arrowNarrowLeft from '@iconify/icons-tabler/arrow-narrow-left';
import arrowNarrowRight from '@iconify/icons-tabler/arrow-narrow-right';

@Component({
  selector: 'app-navigatinon-calendar',
  templateUrl: './navigatinon-calendar.component.html',
  styleUrls: ['./navigatinon-calendar.component.scss'],
})
export class NavigatinonCalendarComponent {
  @Input() firstDayOfWeek?: Date | null;
  @Input() lastDayOfWeek?: Date | null;
  @Output() movePreviousWeek = new EventEmitter<any>();
  @Output() moveNextWeek = new EventEmitter<any>();

  iconArrowNarrowLeft = arrowNarrowLeft;
  iconArrowNarrowRight = arrowNarrowRight;

  previousWeek(event: Event) {
    this.movePreviousWeek.emit();
  }
  nextWeek(event: Event) {
    this.moveNextWeek.emit();
  }
}
