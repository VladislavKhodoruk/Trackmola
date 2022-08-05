import { Component, EventEmitter, Input, Output } from '@angular/core';
import arrowNarrowLeft from '@iconify/icons-tabler/arrow-narrow-left';
import arrowNarrowRight from '@iconify/icons-tabler/arrow-narrow-right';

import { TaskTrack, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-navigation-calendar',
  styleUrls: ['./navigation-calendar.component.scss'],
  templateUrl: './navigation-calendar.component.html',
})
export class NavigationCalendarComponent {
  @Input() firstDay?: Date | null;
  @Input() lastDay?: Date | null;
  @Input() usersInProject?: User[];
  @Input() editableTaskTrack: TaskTrack;

  @Output() previousWeek = new EventEmitter<void>();
  @Output() nextWeek = new EventEmitter<void>();

  readonly iconArrowNarrowLeft = arrowNarrowLeft;
  readonly iconArrowNarrowRight = arrowNarrowRight;
}
