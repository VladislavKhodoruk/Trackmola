import { TaskTrack, User } from '@shared/interfaces/interfaces';

export function SearchUserPhoto(
  id: string,
  taskTracks: TaskTrack[],
  users: User[]
) {
  const allUsers = taskTracks
    .filter((taskTrack) => taskTrack.taskId === id)
    .map((i) => i.userId);
  return allUsers
    .filter((item, index) => allUsers.indexOf(item) === index)
    .map((item) => users.find((user) => user.id === item));
}
