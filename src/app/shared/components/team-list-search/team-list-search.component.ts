import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import check from '@iconify/icons-mdi/check';

import filter from '@iconify/icons-tabler/filter';
import searchIcon from '@iconify/icons-tabler/search';
import angleLeftB from '@iconify/icons-uil/angle-left-b';

import { map, Observable, startWith } from 'rxjs';

import { GroupBy, Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-team-list-search-component',
  templateUrl: './team-list-search.component.html',
  styleUrls: ['./team-list-search.component.scss'],
})
export class TeamListSearchComponent implements OnChanges {
  @Input() allProjects: Project[];
  @Input() projectsByUsers: GroupBy<Project[]>;
  @Input() locations: string[];
  @Input() positions: string[];

  readonly iconAngleLeftB = angleLeftB;
  readonly iconCheck = check;
  readonly iconSearch = searchIcon;
  readonly iconFilter = filter;

  allProjectsName: string[];
  currentProjectId: string;
  currentLocation: string;
  currentPosition: string;
  searchText: string;

  filteredProjectsOptions: Observable<string[]>;
  filteredLocationsOptions: Observable<string[]>;
  filteredPositionsOptions: Observable<string[]>;

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
  isLocation(): void {
    const isLocation = this.locations?.some(
      (location) => location === this.form.get('project').value
    );

    if (isLocation) {
      return;
    }
    this.form.get('location').setValue('');
  }
  isPosition(): void {
    const isPosition = this.positions?.some(
      (position) => position === this.form.get('position').value
    );

    if (isPosition) {
      return;
    }
    this.form.get('position').setValue('');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allProjects) {
      this.allProjectsName = this.allProjects.map((project) => project.name);
      this.filteredProjectsOptions = this.form
        .get('project')
        ?.valueChanges.pipe(
          startWith(''),
          map((value) => {
            this.currentProjectId = this.allProjects?.find(
              (project) => project.name === this.form.get('project').value
            )?.id;
            return this.filterOption(value || '', this.allProjectsName);
          })
        );
    }
    if (changes.locations) {
      this.filteredLocationsOptions = this.form
        .get('location')
        ?.valueChanges.pipe(
          startWith(''),
          map((value) => {
            this.currentLocation = this.locations.find(
              (location) => location === this.form.get('project').value
            );
            return this.filterOption(value || '', this.locations);
          })
        );
    }
    if (changes.positions) {
      this.filteredPositionsOptions = this.form
        .get('position')
        ?.valueChanges.pipe(
          startWith(''),
          map((value) => {
            this.currentPosition = this.positions.find(
              (position) => position === this.form.get('position').value
            );
            return this.filterOption(value || '', this.positions);
          })
        );
    }
  }

  private filterOption(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter((option) =>
      option?.toLowerCase().includes(filterValue)
    );
  }
}
