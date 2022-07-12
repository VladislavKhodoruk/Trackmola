import { Task, TaskTrack, User } from '@shared/interfaces/interfaces';
import { InfoReportConstructorItem } from '../interfaces/interfaces';

export function getInfoFromTaskTracks(
  taskTracks: TaskTrack[],
  users: User[],
  tasks: Task[]
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
      const arrTaskTracks = taskTracks.filter(
        (taskTrack) => taskTrack.taskId === taskIdItem.taskId
      );
      const userName = users.find((user) => user.id === userId).fullName;
      const userDuration = arrTaskTracks.reduce((acc, taskTrack) => {
        if (taskTrack.userId === userId) {
          return acc + taskTrack.duration;
        }
        return acc;
      }, 0);
      return { userId, userName, userDuration };
    });
  });

  console.log(info);
  return info;
}
