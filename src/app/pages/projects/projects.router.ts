import { Routes } from '@angular/router';

import { ActiveTasksContainer } from './components/active-tasks/active-tasks.container';
import { ProjectsContainer } from './layout/projects.container';

export const ProjectsRoutes: Routes = [
  {
    children: [
      {
        component: ActiveTasksContainer,
        path: ':name',
      },
    ],
    component: ProjectsContainer,
    path: '',
  },
  { path: '**', redirectTo: '' },
];
