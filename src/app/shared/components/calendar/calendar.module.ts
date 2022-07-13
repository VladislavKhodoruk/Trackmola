import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarContainer } from './components/calendar/calendar.container';

@NgModule({
  declarations: [CalendarComponent, CalendarContainer, CalendarItemComponent],
  imports: [CommonModule],
  exports: [CalendarContainer],
})
export class CalendarModule {}
