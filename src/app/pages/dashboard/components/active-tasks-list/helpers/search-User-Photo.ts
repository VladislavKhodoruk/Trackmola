import { TaskTrack, User } from '@shared/interfaces/interfaces';

export function SearchUserPhoto(
  id: string,
  taskTracks: TaskTrack[],
  users: User[]
) {
  const allUsers = taskTracks
    .filter((item) => item.taskId === id)
    .map((i) => i.userId);
  const withoutRepeat = allUsers.filter(
    (item, index) => allUsers.indexOf(item) === index
  );
  const userInfo = withoutRepeat.map((item) =>
    users.find((i) => i.id === item)
  );
  // .map((i) => i.photo);
  return userInfo;
}
