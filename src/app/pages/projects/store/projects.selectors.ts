import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { Project, Task, TaskTrack } from '@shared/interfaces/interfaces';
import {
  getPeriod,
  getProjects,
  getTasks,
  getTasksTrack,
  getUsers,
} from '@store/common/common.selectors';
import { RouterStateUrl } from '@store/router/custom-serializer';
import { getCurrentRoute } from '@store/router/router.selector';
import { ProjectsState } from './projects.state';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

export const getProjectByRoute = createSelector(
  getProjects,
  getCurrentRoute,
  (projects, route: RouterStateUrl) =>
    projects.find((project) => project.name.toLowerCase() === route.params.name)
);

export const getActiveTasksInProject = createSelector(
  getProjectByRoute,
  getTasks,
  getTaskTracks,
  getPeriod,
  (project, tasks, taskTracks, period) => {
    if (project && tasks.length && taskTracks.length) {
      const tasksIdInProject = tasks
        .filter(({ projectId }) => projectId === project.id)
        .map((task) => task.id);

      const activeTaskTracks = taskTracks
export const activeTasksInProject = (project: Project) =>
  createSelector(
    getTasks,
    getTasksTrack,
    getPeriod,
    (tasks, taskTracks, period) => {
      const tasksIdInProject: Task['id'][] = tasks
        .filter(({ projectId }) => projectId === project.id)
        .map((task) => task.id);
      return taskTracks
        .filter(({ taskId }) => tasksIdInProject.includes(taskId))
        .filter(({ date }) => {
          const startDate = period.start;
          const endDate = period.end;
          return (
            date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate
          );
        });

      const activeIdTasks = activeTaskTracks.map(
        (tasktrack) => tasktrack.taskId
      );

      return tasks.filter((task) => activeIdTasks.includes(task.id));
    }
  }
);

export const getActiveTaskTracksInTask = (task: Task) =>
  createSelector(
    getTaskTracks,
    getPeriod,
    getUsers,
    (taskTracks, period, users) => {
      if (taskTracks && period) {
        const aсtiveTaskTracksInTask = taskTracks
          .filter(({ taskId }) => taskId === task.id)
          .filter(({ date }) => {
            const startDate = period.start;
            const endDate = period.end;
            return (
              date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate
            );
          });
        const userInfo = aсtiveTaskTracksInTask.map((taskTrack) =>
          users.find((user) => user.id === taskTrack.userId)
        );

        return aсtiveTaskTracksInTask;
      }
    }
  );
    }
  );

export const usersInProject = (project: Project) =>
  createSelector(getUsers, getTasksTrack, (users, taskTracks) => {
    const usersIdInProjects: TaskTrack['userId'][] = taskTracks
      .filter(({ projectId }) => projectId === project.id)
      .sort((a, b) => b.date.seconds - a.date.seconds)
      .map((taskTrack) => taskTrack.userId);

    return usersIdInProjects.map((userId) =>
      users.find((user) => user.id === userId)
    );
  });
