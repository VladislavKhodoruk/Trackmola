import {
  Project,
  Task,
  TaskTrack,
  UserProfileInProject,
} from '@pages/projects/interfaces/interfaces';

export interface ProjectsState {
  projects?: Project[];
  tasks?: TaskTrack[];
  allTasksInProjects?: Task[];
  userInProjects?: UserProfileInProject[];
  selectedProject?: Project;
  searchValue: string;
}

export const projectsState: ProjectsState = {
  allTasksInProjects: [],
  userInProjects: [],
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
