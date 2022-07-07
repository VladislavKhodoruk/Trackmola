import { RouterStateUrl } from './../../../store/router/custom-serializer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { getCurrentRoute } from '@store/router/router.selector';
import { ProjectsState } from './projects.state';
import { Task } from '@shared/interfaces/interfaces';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getProjects = createSelector(
  getProjectsState,
  ({ projects }) => projects
);

export const getTasks = createSelector(getProjectsState, ({ tasks }) => tasks);

export const getTaskTracks = createSelector(
  getProjectsState,
  ({ taskTracks }) => taskTracks
);

export const getPeriod = createSelector(
  getProjectsState,
  ({ period }) => period
);

export const getUsers = createSelector(getProjectsState, ({ users }) => users);

export const getSelectedProject = createSelector(
  getProjectsState,
  ({ selectedProject }) => selectedProject
);

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
