import { Component, Input, OnInit } from '@angular/core';
import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects-team',
  templateUrl: './projects-team.component.html',
  styleUrls: ['./projects-team.component.scss'],
})
export class ProjectsTeamComponent {

  @Input() readonly activeTasksInProject: TaskTrack[];
  @Input() readonly usersInProject: User[];
  @Input() readonly projectByRoute: Project;
  constructor() { }

}
