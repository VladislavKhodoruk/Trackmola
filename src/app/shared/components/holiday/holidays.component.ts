import { Component, OnInit } from '@angular/core';
import pineapple from '@iconify/icons-noto/pineapple';

import { IconifyIcon } from '@iconify/types';

import { DayType } from '@shared/enums/enum';

import { CalendarDay, Holiday } from '@shared/interfaces/interfaces';
import { groupByDate } from 'app/calendars';

@Component({
  selector: 'app-holidays',
  styleUrls: ['./holidays.component.scss'],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent implements OnInit {
  readonly pineappleIcon: IconifyIcon = pineapple;

  holidays: Holiday[] = [];

  ngOnInit(): void {
    const holidays = Object.keys(groupByDate).flatMap((key: string) =>
      groupByDate[key]
        .filter(
          (day: CalendarDay) =>
            day.dayType === DayType.Holiday &&
            new Date(day.date).getTime() > new Date().getTime()
        )
        .map((day) => ({
          date: day.date,
          holidayImg: day.holidayImg,
          holidayName: day.holidayName,
          location: key,
        }))
    );
    holidays.map((holiday) => {
      if (
        this.holidays.some((item) => item.holidayName === holiday.holidayName)
      ) {
        return;
      }
      if (
        holidays.filter((day) => holiday.holidayName === day.holidayName)
          .length > 1
      ) {
        const filteredHolidays = holidays.filter(
          (item) => holiday.date === item.date
        );

        const holidayImg = filteredHolidays.find(
          (item) => item.holidayImg
        ).holidayImg;

        const locations = filteredHolidays.map((item) => item.location);
        this.holidays.push({
          date: new Date(holiday.date),
          holidayImg,
          holidayName: holiday.holidayName,
          locations,
        });
        return;
      }
      this.holidays.push({
        date: new Date(holiday.date),
        holidayImg: holiday.holidayImg,
        holidayName: holiday.holidayName,
        locations: [holiday.location],
      });
    });
    this.holidays.sort((a, b) =>
      a.date.getTime() > b.date.getTime() ? 1 : -1
    );
  }
}
