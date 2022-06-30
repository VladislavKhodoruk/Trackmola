import {
  Project,
  Task,
  UserProfileInProject,
} from '@pages/projects/interfaces/interfaces';

export interface ProjectsState {
  myProjects: Project[];
  allTasksInProjects: Task[];
  userInProjects: UserProfileInProject[];
  selectedProject: Project;
  searchValue: string;
}

export const projectsState: ProjectsState = {
  myProjects: [],
  allTasksInProjects: [],
  userInProjects: [],
  selectedProject: {
    id: '',
    name: '',
    fullName: '',
    manager: '',
    team: [],
    description: '',
  },
  searchValue: '',
};
