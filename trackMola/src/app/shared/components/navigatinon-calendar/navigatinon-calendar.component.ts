import { Component, Input } from '@angular/core';
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

  iconArrowNarrowLeft = arrowNarrowLeft;
  iconArrowNarrowRight = arrowNarrowRight;

  previousWeek(event: Event) {
    console.log('prevWeek');
  }
  nextWeek(event: Event) {
    console.log('nextWeek');
  }
}
