import { Project, Task, TaskTrack } from '@shared/interfaces/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
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
