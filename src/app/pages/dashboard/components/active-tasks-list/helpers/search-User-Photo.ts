import { User } from '@shared/interfaces/interfaces';
import { TaskTrack } from '@store/shared/shared.state';

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
  const obj = withoutRepeat.map((item) => {
    return users.find((i) => {
      if (i.id && i.id == item) {
        return i.photo;
      }
    });
  });
  return obj;
}
