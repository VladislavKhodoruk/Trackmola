import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '@pages/projects/interfaces/interfaces';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  @Input() myProjects!: Project[];
  @Input() selectedProject!: Project;
  @Input() searchText: string;

  @Output() selectProjectEmitter = new EventEmitter<Project>();

  public selectProject(project: Project) {
    this.selectProjectEmitter.emit(project);
  }
}
