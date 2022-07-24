import { SeriesOptionsType } from 'highcharts';

import { ModifiedTask, WeekType } from '@pages/activity/interfaces/interfaces';
import { SHORT_NAMES_OF_THE_WEEK_UPPERCASE } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';
import { Period, Project, TaskTrack } from '@shared/interfaces/interfaces';

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
        start: startDate.getTime(),
        end: endDate.getTime(),
      };
    }
    case PeriodType.Month: {
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);
      return {
        start: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
        end: endDate.getTime(),
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
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
    SUN: [],
  };
  const desiredTasks = tasks.map(
    (task: TaskTrack): ModifiedTask => ({
      projectName: getProjectNameAndColor(task.projectId, projects)?.name,
      projectColor: getProjectNameAndColor(task.projectId, projects)?.color,
      projectId: task.projectId,
      duration: task.duration,
      date: task.date.toDate(),
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
      type: 'column',
      name: project,
      data: searchInWeek(project, weekTasksByDays),
      color: getColorOfProjectByName(project, projects)?.color,
    }));
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
