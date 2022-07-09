import { Component, Input } from '@angular/core';
import { Project } from '@shared/interfaces/interfaces';
import { RouterStateUrl } from '@store/router/custom-serializer';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  @Input() readonly searchText: string;
  @Input() readonly projects: Project[];
  @Input() readonly currentRoute: RouterStateUrl;
  
}
