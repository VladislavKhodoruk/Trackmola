import { Component, EventEmitter, Input, Output } from '@angular/core';
import arrowNarrowLeft from '@iconify/icons-tabler/arrow-narrow-left';
import arrowNarrowRight from '@iconify/icons-tabler/arrow-narrow-right';

import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-navigation-calendar',
  templateUrl: './navigation-calendar.component.html',
  styleUrls: ['./navigation-calendar.component.scss'],
})
export class NavigationCalendarComponent {
  @Input() firstDay?: Date | null;
  @Input() lastDay?: Date | null;
  @Input() usersInProject?: User[];

  @Output() previousWeek = new EventEmitter<void>();
  @Output() nextWeek = new EventEmitter<void>();

  readonly iconArrowNarrowLeft = arrowNarrowLeft;
  readonly iconArrowNarrowRight = arrowNarrowRight;
}
