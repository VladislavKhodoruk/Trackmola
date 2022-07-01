import {
  Project,
  TaskTrack,
  User,
} from '@pages/projects/interfaces/interfaces';

export interface ProjectsState {
  projects?: Project[];
  tasks?: TaskTrack[];
  activeTasksInProjects?: TaskTrack[];
  selectedProject?: Project;
  searchValue: string;
  users?: User[];
}

export const projectsState: ProjectsState = {
  activeTasksInProjects: [],
  selectedProject: {
    id: '',
    color: '',
    description: '',
    fullName: '',
    managersId: [''],
    name: '',
    taskId: [''],
  },
  searchValue: '',
};
