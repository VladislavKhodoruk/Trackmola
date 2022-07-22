import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import check from '@iconify/icons-mdi/check';

import angleLeftB from '@iconify/icons-uil/angle-left-b';

import { Project } from '@shared/interfaces/interfaces';
@Component({
  selector: 'app-team-list-search-component',
  templateUrl: './team-list-search.component.html',
  styleUrls: ['./team-list-search.component.scss'],
})
export class TeamListSearchComponent {
  @Input() allProjects: Project[];

  readonly iconAngleLeftB = angleLeftB;
  readonly iconCheck = check;

  form = new FormGroup({
    project: new FormControl(''),
    location: new FormControl(''),
    position: new FormControl(''),
  });

  isProject(): void {
    const isProject = this.allProjects?.some(
      (project) => project.name === this.form.get('project').value
    );

    if (isProject) {
      return;
    }

    this.form.get('project').setValue('');
  }
}
