import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import chartArrows from '@iconify/icons-tabler/chart-arrows';
import pinnedIcon from '@iconify/icons-tabler/pinned';
import pinnedOff from '@iconify/icons-tabler/pinned-off';
import tableIcon from '@iconify/icons-tabler/table';
import angleDown from '@iconify/icons-uil/angle-down';
import { IconifyIcon } from '@iconify/types';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import { Project } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-controls',
  styleUrls: ['./manager-controls.component.scss'],
  templateUrl: './manager-controls.component.html',
})
export class ManagerControlsComponent implements OnChanges {
  @Input() readonly managerProjects: Project[];
  @Input() readonly managerProjectsFilter: Project[];
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly activeProjectFilter: Project;

  @Output() projectFilter = new EventEmitter<Project['name']>();
  @Output() setActiveFilterProject = new EventEmitter<Project>();
  @Output() removeProjectFilter = new EventEmitter<void>();
  @Output() changeManagerMainView = new EventEmitter<ManagerDashboardView>();

  readonly iconAngleDown: IconifyIcon = angleDown;
  readonly iconPinned: IconifyIcon = pinnedIcon;
  readonly iconPinnedOff: IconifyIcon = pinnedOff;
  readonly iconTable: IconifyIcon = tableIcon;
  readonly iconChartArrows: IconifyIcon = chartArrows;

  managerDashboardView = ManagerDashboardView;

  projectInput = new FormControl('');

  filteredProjects: Observable<Project[]>;

  constructor(private renderer: Renderer2) {}

  focusProjectInput() {
    const projectInput: HTMLElement = this.renderer.selectRootElement(
      '.dashboard-controls-project-input'
    );
    return projectInput.ariaExpanded === 'true'
      ? projectInput.blur()
      : projectInput.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.managerProjects) {
      this.filteredProjects = this.projectInput.valueChanges.pipe(
        startWith(''),
        map((projectInputValue) => this._filter(projectInputValue || ''))
      );
    }
  }

  private _filter(projectInputValue: string): Project[] {
    return this.managerProjects.filter((project) =>
      project.name.toLowerCase().includes(projectInputValue.toLowerCase())
    );
  }

  protected addProjectToFilter(): void {
    if (this.projectInput.value.length) {
      this.projectFilter.emit(this.projectInput.value);
      this.projectInput.reset();
    }
  }
}
