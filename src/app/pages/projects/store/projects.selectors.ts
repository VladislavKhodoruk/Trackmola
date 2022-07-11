import { RouterStateUrl } from '@store/router/custom-serializer';
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
import { TaskGroupByProject } from '@pages/projects/interfaces/interface';

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

export const filteredTaskTracksByPeriod = createSelector(
  getTasksTrack,
  getPeriod,
  (taskTracks, period) =>
    taskTracks.filter(({ date }) => {
      const startDate = period.start;
      const endDate = period.end;
      return date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate;
    })
);

export const activeTaskGroupByProject = createSelector(
  getTasks,
  getProjects,
  filteredTaskTracksByPeriod,
  (tasks, projects, taskTracks) =>
    projects.reduce((accum, project) => {
      const activeTasksId = taskTracks
        .filter(({ projectId }) => projectId === project.id)
        .map(({ taskId }) => taskId);

      const activeTasks = tasks.filter(({ id }) => activeTasksId.includes(id));

      return { ...accum, [project.id]: activeTasks };
    }, {})
);

export const usersGroupByProject = createSelector(
  filteredTaskTracksByPeriod,
  getProjects,
  getUsers,
  (taskTracks, projects, users) =>
    projects.reduce((acum, project) => {
      const usersInTaskTracks = taskTracks
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .filter(({ projectId }) => projectId === project.id)
        .map(({ userId }) => userId);

      const filteredUsers = users.filter(({ id }) =>
        usersInTaskTracks.includes(id)
      );

      return {
        ...acum,
        [project.id]: filteredUsers,
      };
    }, {})
);

export const getActiveTasksInProject = (project: Project) =>
  createSelector(
    activeTaskTracksInProject(project),
    getTasks,
    (taskTracks, tasks) => {
      const tasksId = taskTracks.map((taskTrack) => taskTrack.taskId);
      return tasks
        .filter(({ id }) => tasksId.includes(id))
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
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
