import { Autolinker, AutolinkerConfig } from 'autolinker';
import { SeriesOptionsType } from 'highcharts';

import { groupByDate } from '../../calendars';

import { ModifiedTask } from '@pages/activity/interfaces/interfaces';
import { DaysByPeriod } from '@pages/dashboard/interfaces/interface';
import {
  COLORS_FOR_TASKS,
  HIGHEST_KPI,
  NUMBER_OF_DAYS_IN_A_WEEK,
  ONE_DAY_IN_SECONDS,
  ONE_WEEK_IN_SECONDS,
  OUTPUT_RATE,
  SHORT_NAMES_OF_THE_WEEK_UPPERCASE,
} from '@shared/constants/constants';
import { NumDay, PeriodType } from '@shared/enums/enum';
import {
  CalendarDay,
  GroupBy,
  OutOfMain,
  Period,
  Project,
  TaskByWeekDays,
  TaskTrack,
  TaskTracksByUser,
  User,
  UserCard,
  Vacation,
  Vacations,
} from '@shared/interfaces/interfaces';

export function getPeriod(date: Date, type?: PeriodType): Period {
  switch (type) {
    case PeriodType.Week: {
      const dayOfWeek = date.getDay();
      const startDay =
        date.getDate() -
        dayOfWeek +
        (dayOfWeek === NumDay.Sunday ? -NumDay.Saturday : NumDay.Monday);
      const startDate = new Date(date.getFullYear(), date.getMonth(), startDay);
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        startDay + NumDay.Saturday
      );
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      return {
        end: endDate.getTime(),
        start: startDate.getTime(),
      };
    }
    case PeriodType.TwoWeek: {
      const dayOfWeek = date.getDay();
      const startDay =
        date.getDate() -
        dayOfWeek +
        (dayOfWeek === NumDay.Sunday ? -NumDay.Saturday : NumDay.Monday);
      const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        startDay - NUMBER_OF_DAYS_IN_A_WEEK
      );
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        startDay + NumDay.Saturday
      );
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      return {
        end: endDate.getTime(),
        start: startDate.getTime(),
      };
    }
    case PeriodType.Month: {
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      return {
        end: endDate.getTime(),
        start: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
      };
    }
  }
}

export function getPeriodUTC(period: Period): Period {
  const startUTC = Date.UTC(
    new Date(period.start).getFullYear(),
    new Date(period.start).getMonth(),
    new Date(period.start).getDate()
  );
  const endUTC = Date.UTC(
    new Date(period.end).getUTCFullYear(),
    new Date(period.end).getUTCMonth(),
    new Date(period.end).getUTCDate() + 1
  );

  return {
    end: endUTC,
    start: startUTC,
  };
}

export function getProjectNameAndColor(id: string, projects: Project[]) {
  return projects.find((project) => project.id === id);
}

export function getColorOfProjectByName(proj: string, projects: Project[]) {
  return projects.find((item: Project) => item.name === proj);
}

export function searchInWeek(
  currentProject: string,
  weekTasksByDays: ModifiedTask[] | object
): number[] {
  return Object.values(weekTasksByDays).map((day: ModifiedTask[]) => {
    if (day.length === 1 && day[0].projectName === currentProject) {
      return day[0].duration;
    }
    if (day.length >= 2 && day.length) {
      return day
        .filter((i: ModifiedTask) => i.projectName === currentProject)
        .map((i: ModifiedTask) => i.duration)
        .reduce((acc, prev) => acc + prev, 0);
    }
    if (day.length === 0 || day.length === 1) {
      return 0;
    }
  });
}
export function getDataForChart(
  tasks: TaskTrack[],
  projects: Project[]
): SeriesOptionsType[] {
  const weekTasksByDays = SHORT_NAMES_OF_THE_WEEK_UPPERCASE.reduce(
    (acc, prev) => {
      acc[prev] = [];
      return acc;
    },
    {}
  );

  const desiredTasks = tasks.map(
    (task: TaskTrack): ModifiedTask => ({
      date: task.date.toDate(),
      duration: task.duration,
      projectColor: getProjectNameAndColor(task.projectId, projects)?.color,
      projectId: task.projectId,
      projectName: getProjectNameAndColor(task.projectId, projects)?.name,
    })
  );
  desiredTasks.forEach((task: ModifiedTask) => {
    const currentDay: number = task.date.getDay() - 1;
    const day: string = SHORT_NAMES_OF_THE_WEEK_UPPERCASE[currentDay];
    weekTasksByDays[day] = [...weekTasksByDays[day], task];
  });
  const allProjects = desiredTasks.map(
    (i: ModifiedTask): string => i.projectName
  );
  return allProjects
    .filter(
      (item: string, index: number) => allProjects.indexOf(item) === index
    )
    .map((project) => ({
      color: getColorOfProjectByName(project, projects)?.color,
      data: searchInWeek(project, weekTasksByDays),
      name: project,
      type: 'column',
    }));
}

export function getRandomColor(): string {
  const colors = COLORS_FOR_TASKS;
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function sortTaskByDays(taskTrack: TaskTrack[]): TaskByWeekDays {
  const weekTasksByDays = SHORT_NAMES_OF_THE_WEEK_UPPERCASE.reduce(
    (acc, prev) => {
      acc[prev] = [];
      return acc;
    },
    {}
  );

  taskTrack.forEach((task: TaskTrack) => {
    const currentDay: number = task.date.toDate().getDay() - 1;
    const day: string = SHORT_NAMES_OF_THE_WEEK_UPPERCASE[currentDay];
    weekTasksByDays[day] = [...weekTasksByDays[day], task];
  });

  return weekTasksByDays as TaskByWeekDays;
}

export function getEfficiency(
  taskTrack: TaskTrack[],
  startOfWeek: number,
  presentDay: number
): number {
  const allHoursByDays = Object.values(sortTaskByDays(taskTrack))
    .map((i: TaskTrack[]) => i.reduce((acc, prev) => acc + prev.duration, 0))
    .map((dayHours) =>
      dayHours / OUTPUT_RATE >= HIGHEST_KPI
        ? HIGHEST_KPI - (dayHours / OUTPUT_RATE - HIGHEST_KPI)
        : dayHours / OUTPUT_RATE
    )
    .reduce((acc, prev) => acc + prev, 0);

  return allHoursByDays / new Date(presentDay).getDay();
}

export function outOfNorm(
  taskTrack: TaskTrack[],
  presentDay: number
): OutOfMain {
  const mismatch = {
    overtimes: 0,
    shortages: 0,
    working: 0,
  };

  Object.values(sortTaskByDays(taskTrack))
    .map((item: TaskTrack[]) =>
      item.reduce((acc, prev) => acc + prev.duration, 0)
    )
    .forEach((dayDuration, index) => {
      if (dayDuration <= OUTPUT_RATE && index < new Date(presentDay).getDay()) {
        mismatch.shortages += OUTPUT_RATE - dayDuration;
        mismatch.working += dayDuration;
      }
      if (dayDuration > OUTPUT_RATE) {
        mismatch.overtimes += dayDuration - OUTPUT_RATE;
        mismatch.working += OUTPUT_RATE;
      }
    });
  return mismatch;
}

export function urlReplacer(text: string): string {
  const options: AutolinkerConfig = { className: 'link' };
  const replacer: Autolinker = new Autolinker(options);
  return replacer.link(text);
}

export function isWeekend(day: number): boolean {
  const date: Date = new Date(day);

  return date.getDay() === NumDay.Saturday || date.getDay() === NumDay.Sunday;
}

export function daysInPeriod(period: Period): DaysByPeriod {
  const start: Date = new Date(period.start);

  const totalDays: number = Math.round(
    (period.end - period.start) / ONE_DAY_IN_SECONDS
  );
  const weekends: DaysByPeriod['weekends'] = [];
  const days: DaysByPeriod['days'] = [];

  for (let i = 0; i < totalDays; i++) {
    const date: Date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i
    );

    days.push(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    if (isWeekend(date.getTime())) {
      const weekend = {
        from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      };

      weekends.push(weekend);
    }
  }

  return {
    days,
    weekends,
  };
}

export function weeksInPeriod(period: Period): number {
  return (
    (new Date(period.end).getTime() - new Date(period.start).getTime()) /
    ONE_WEEK_IN_SECONDS
  );
}

export function taskTracksByUser(taskTracks: TaskTrack[]): TaskTracksByUser[] {
  const taskTracksGroupByUser: GroupBy<TaskTrack[]> = taskTracks.reduce(
    (accum: GroupBy<TaskTrack[]>, taskTrack: TaskTrack) => {
      const userId = taskTrack.userId;
      if (!accum[userId]) {
        accum[userId] = [];
      }
      accum[userId].push(taskTrack);
      return accum;
    },
    {}
  );

  return Object.keys(taskTracksGroupByUser).map((key) => ({
    taskTracks: taskTracksGroupByUser[key],
    userId: key,
  }));
}

export function compareTwoDates(
  dateFirst: number,
  dateSecond: number
): boolean {
  const date = new Date(dateFirst * 1000);
  const date2 = new Date(dateSecond * 1000);
  const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const date2UTC = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );
  return dateUTC !== date2UTC && dateUTC !== date2UTC + ONE_DAY_IN_SECONDS;
}

export function taskTracksByPeriods(taskTracks: TaskTrack[]): [TaskTrack?][] {
  const sortedTaskTracks = taskTracks.sort(
    (a, b) => a.date.seconds - b.date.seconds
  );
  return sortedTaskTracks.reduce(
    (
      accum: [TaskTrack?][],
      taskTrack: TaskTrack,
      index: number,
      array: TaskTrack[]
    ) => {
      if (
        !index ||
        compareTwoDates(taskTrack.date.seconds, array[index - 1].date.seconds)
      ) {
        accum.push([]);
      }

      accum[accum.length - 1].push(taskTrack);
      return accum;
    },
    []
  );
}

export function getUserName(users: User[], id): string {
  return users.find((user: User) => user.id === id).fullName;
}

export function getUserPhoto(users: User[], id): string {
  return users.find((user: User) => user.id === id).photo;
}

export function getLocation(id: string, users: User[]): string {
  return users.find((user: User) => user.id === id).location;
}

export function getCurrentVacations(id: string, vacations: Vacation[]) {
  return vacations.filter((vacation) => vacation.userId === id);
}

export function getCurrentHolidays(
  location: string,
  vacations: Vacation[],
  users: User[]
): Vacations[] {
  const country = location.split(',')[1];
  if (country === ' Belarus') {
    return groupByDate.BY.filter(
      (day) => day.date >= new Date().toISOString() && day.dayType === 'holiday'
    )
      .map(
        (day: CalendarDay): Vacations => ({
          fullName: day.holidayName,
          photo: day.holidayImg,
          vacationDay: new Date(day.date),
        })
      )
      .concat(
        vacations.map((vacation: Vacation) => ({
          fullName: getUserName(users, vacation.userId),
          photo: getUserPhoto(users, vacation.userId),
          vacationDay: vacation.periodStart.toDate(),
        }))
      )
      .sort((a, b) => a.vacationDay.valueOf() - b.vacationDay.valueOf());
  }
}

export function getVacationsAndHolidaysByProject(
  team: User[],
  vacations: Vacation[],
  users: User[]
) {
  return team
    .map((member: User): Vacation[] =>
      vacations.filter((vacation: Vacation) => vacation.userId === member.id)
    )
    .flat()
    .map((vac: Vacation) =>
      getCurrentHolidays(
        getLocation(vac.userId, users),
        getCurrentVacations(vac.userId, vacations),
        users
      )
    )
    .flat()
    .sort((a, b) => a.vacationDay.getTime() - b.vacationDay.getTime());
}

export function setUserPhotoInVacations(
  vacations: Vacation[],
  users: UserCard[]
) {
  return vacations.map((vacation: Vacation) =>
    users.forEach((user: UserCard) => {
      if (user.id === vacation.userId) {
        return user.photo;
      }
    })
  );
}
