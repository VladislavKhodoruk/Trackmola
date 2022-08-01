import { SeriesOptionsType } from 'highcharts';

import { ModifiedTask } from '@pages/activity/interfaces/interfaces';
import {
  COLORS_FOR_TASKS,
  OutputRate,
  SHORT_NAMES_OF_THE_WEEK_UPPERCASE,
} from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';
import {
  OutOfMain,
  Period,
  Project,
  TaskTrack,
} from '@shared/interfaces/interfaces';

export function getPeriod(date: Date, type?: PeriodType): Period {
  switch (type) {
    case PeriodType.Week: {
      const dayOfWeek = date.getDay();
      const startDay = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const startDate = new Date(date.getFullYear(), date.getMonth(), startDay);
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        startDay + 6
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

export function getEfficiency(
  taskTrack: TaskTrack[],
  startOfWeek: number,
  presentDay: number
): number {
  const totalHours = taskTrack
    .map((task: TaskTrack) => task.duration)
    .reduce((acc, prev) => acc + prev, 0);
  const requiredAmount =
    (1 + new Date(presentDay).getDay() - new Date(startOfWeek).getDay()) *
    OutputRate;

  return totalHours <= requiredAmount
    ? totalHours / requiredAmount
    : totalHours / requiredAmount - 1;
}

export function outOfNorm(
  taskTrack: TaskTrack[],
  presentDay: number
): OutOfMain {
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

  const mismatch = {
    overtimes: 0,
    shortages: 0,
    working: 0,
  };

  Object.values(weekTasksByDays)
    .map((item: TaskTrack[]) =>
      item.reduce((acc, prev) => acc + prev.duration, 0)
    )
    .forEach((dayDuration, index) => {
      if (dayDuration <= OutputRate && index < new Date(presentDay).getDay()) {
        mismatch.shortages += OutputRate - dayDuration;
        mismatch.working += dayDuration;
      }
      if (
        dayDuration > OutputRate &&
        index <= new Date(presentDay).getDay() - 1
      ) {
        mismatch.overtimes += dayDuration - OutputRate;
        mismatch.working += OutputRate;
      }
      if (index === new Date(presentDay).getDay()) {
        mismatch.overtimes = dayDuration;
      }
    });
  return mismatch;
}
