import { Routes } from '@angular/router';
import { InputSearchContainer } from './components/projects-list/input-search/input-search.container';
import { ProjectsContainer } from './layout/projects.container';

export const ProjectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsContainer,
    children: [
      {
        path: ':name',
        component: InputSearchContainer,
      },
    ],
  },
];
