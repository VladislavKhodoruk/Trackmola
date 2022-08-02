import { SeriesOptionsType } from 'highcharts';

import { ModifiedTask, WeekType } from '@pages/activity/interfaces/interfaces';
import {
  COLORS_FOR_TASKS,
  NUMBER_OF_DAYS_IN_A_WEEK,
  SHORT_NAMES_OF_THE_WEEK_UPPERCASE,
} from '@shared/constants/constants';
import { NumDay, PeriodType } from '@shared/enums/enum';
import { Period, Project, TaskTrack } from '@shared/interfaces/interfaces';

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
  weekTasksByDays: WeekType
): number[] {
  return Object.values(weekTasksByDays).map((day: [] | ModifiedTask[]) => {
    if (day.length === 1 && day[0].projectName === currentProject) {
      return day[0].duration;
    }
    if (day.length >= 2 && day.length) {
      return day
        .filter((i: ModifiedTask) => i.projectName === currentProject)
        .map((i: ModifiedTask) => i.duration)
        .reduce((acc, prev) => acc + prev);
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
  const weekTasksByDays: WeekType = {
    FRI: [],
    MON: [],
    SAT: [],
    SUN: [],
    THU: [],
    TUE: [],
    WED: [],
  };
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
