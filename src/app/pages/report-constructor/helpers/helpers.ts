import {
  InfoFromTaskTracksForTable,
  InfoReportConstructorItem,
  SortOption,
} from '../interfaces/interfaces';

import { MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY } from '@shared/constants/constants';
import { NumDay } from '@shared/enums/enum';
import { Period, Task, TaskTrack, User } from '@shared/interfaces/interfaces';

export function getInfoFromTaskTracks(
  taskTracks: TaskTrack[],
  users: User[],
  tasks: Task[],
  worksTime: number
): InfoReportConstructorItem[] {
  const info: InfoReportConstructorItem[] = [];
  Array.from(new Set(taskTracks?.map((taskTrack) => taskTrack.taskId))).map(
    (taskId) => {
      const taskName = tasks.find((task) => task.id === taskId).name;
      info.push({ taskId, taskName });
    }
  );

  info.map((taskIdItem: InfoReportConstructorItem) => {
    taskIdItem.usersInfo = Array.from(
      new Set(
        taskTracks
          .filter((taskTrack) => taskTrack.taskId === taskIdItem.taskId)
          .map((userIdArr) => userIdArr.userId)
      )
    ).map((userId) => {
      const filteredTaskTracks = taskTracks.filter(
        (taskTrack) => taskTrack.taskId === taskIdItem.taskId
      );
      const taskDuration = filteredTaskTracks.reduce(
        (acc, taskTrack) => (acc += taskTrack.duration),
        0
      );
      const userData = users.find((user) => user.id === userId);
      const userName = userData?.fullName;
      const userPosition = userData?.position;
      const userDuration = filteredTaskTracks.reduce((acc, taskTrack) => {
        if (taskTrack.userId === userId) {
          return acc + taskTrack.duration;
        }
        return acc;
      }, 0);
      const taskPercentageWeek = +((taskDuration / worksTime) * 100).toFixed(2);

      const userPercentageAllDurationTask = +(
        (userDuration / taskDuration) *
        100
      ).toFixed(2);

      taskIdItem.taskDuration = taskDuration;
      taskIdItem.taskPercentageWeek = taskPercentageWeek;

      return {
        userId,
        userName,
        userPosition,
        userPercentageAllDurationTask,
      };
    });
  });
  return info;
}

export function getWorksCustomPeriodHours(period: Period): number {
  let workCustomHours = 0;
  for (
    let i = new Date(period.start).getDate();
    i < new Date(period.end).getDate();
    i++
  ) {
    const date = new Date(
      new Date(period.start).getFullYear(),
      new Date(period.start).getMonth(),
      i
    ).getDay();
    if (date !== NumDay.Saturday && date !== NumDay.Sunday) {
      workCustomHours += MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY;
    }
  }
  return workCustomHours;
}

export function getSortInfoReportConstructor(
  infoItem: InfoFromTaskTracksForTable[],
  selectedSort: SortOption,
  columnType: string
): InfoFromTaskTracksForTable[] {
  switch (columnType) {
    case 'string':
      infoItem.sort((a, b) =>
        a[selectedSort.columnName] > b[selectedSort.columnName] &&
        selectedSort.ascendingSort
          ? 1
          : -1
      );
      return infoItem;
    case 'number':
      infoItem.sort((a, b) =>
        selectedSort.ascendingSort
          ? a[selectedSort.columnName] - b[selectedSort.columnName]
          : b[selectedSort.columnName] - a[selectedSort.columnName]
      );
  }
}

export function getTeam(
  users: User[],
  infoFromTaskTracks: InfoReportConstructorItem[]
): User[] {
  const teamProjectId: string[] = Array.from(
    new Set(
      infoFromTaskTracks.flatMap((infoFromTaskTrack) =>
        infoFromTaskTrack.usersInfo.map((userInfo) => userInfo.userId)
      )
    )
  );
  return teamProjectId.map((userId) =>
    users.find((user) => user.id === userId)
  );
}
