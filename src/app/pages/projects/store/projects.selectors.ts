import { RouterStateUrl } from './../../../store/router/custom-serializer';
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
import { ProjectsState } from './projects.state';
import { getCurrentRoute } from '@store/router/router.selector';

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

export const activeTaskTracksInProject = (project: Project) =>
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
  createSelector(
    getUsers,
    getTasksTrack,
    getPeriod,
    (users, taskTracks, period) => {
      const usersIdInProjects: TaskTrack['userId'][] = taskTracks
        .filter(({ projectId }) => projectId === project.id)
        .filter(({ date }) => {
          const startDate = period.start;
          const endDate = period.end;
          return (
            date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate
          );
        })
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .map((taskTrack) => taskTrack.userId);

      return usersIdInProjects.map((userId) =>
        users.find((user) => user.id === userId)
      );
    }
  );

export const getActiveTasksInProject = (project: Project) =>
  createSelector(
    activeTaskTracksInProject(project),
    getTasks,
    (taskTracks, tasks) => {
      const tasksId = taskTracks.map((taskTrack) => taskTrack.taskId);
      return tasks.filter(({ id }) => tasksId.includes(id));
    }
  );

export const getActiveTaskTracksInTask = (task: Task) =>
  createSelector(
    getTasksTrack,
    getUsers,
    getPeriod,
    (taskTracks, users, period) => {
      const activeTaskTracksInTask: TaskTrack[] = taskTracks
        .filter(({ taskId }) => taskId === task.id)
        .filter(({ date }) => {
          const startDate = period.start;
          const endDate = period.end;
          return (
            date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate
          );
        });

      return activeTaskTracksInTask.map((taskTrack) => {
        const userInfo = users.find((user) => user.id === taskTrack.userId);
        return { ...taskTrack, userInfo };
      });
    }
  );
