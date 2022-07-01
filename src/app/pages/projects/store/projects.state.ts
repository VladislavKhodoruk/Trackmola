import { Project, TaskTrack } from '@pages/projects/interfaces/interfaces';

export interface ProjectsState {
  projects?: Project[];
  tasks?: TaskTrack[];
  activeTasksInProjects?: TaskTrack[];
  selectedProject?: Project;
  searchValue: string;
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
