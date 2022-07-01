import { User } from '@pages/projects/interfaces/interfaces';
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
  @Input() usersInProject?: User[];

  @Output() previousWeek = new EventEmitter<void>();
  @Output() nextWeek = new EventEmitter<void>();

  readonly iconArrowNarrowLeft = arrowNarrowLeft;
  readonly iconArrowNarrowRight = arrowNarrowRight;
}
