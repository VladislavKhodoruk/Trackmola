import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { CalendarContainer } from './components/calendar/calendar.container';

@NgModule({
  declarations: [CalendarComponent, CalendarContainer, CalendarItemComponent],
  imports: [CommonModule],
  exports: [CalendarComponent, CalendarContainer],
})
export class CalendarModule {}
