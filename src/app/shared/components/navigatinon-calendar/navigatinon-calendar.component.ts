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
  @Input() managersPhoto?: string[];

  @Output() movePreviousWeek = new EventEmitter<void>();
  @Output() moveNextWeek = new EventEmitter<void>();

  readonly iconArrowNarrowLeft = arrowNarrowLeft;
  readonly iconArrowNarrowRight = arrowNarrowRight;

  public previousWeek(event: Event): void {
    event.preventDefault();
    this.movePreviousWeek.emit();
  }
  public nextWeek(event: Event): void {
    event.preventDefault();
    this.moveNextWeek.emit();
  }
}
