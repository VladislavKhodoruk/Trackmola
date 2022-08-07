import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import chartArrows from '@iconify/icons-tabler/chart-arrows';
import pinnedIcon from '@iconify/icons-tabler/pinned';
import pinnedOff from '@iconify/icons-tabler/pinned-off';
import tableIcon from '@iconify/icons-tabler/table';
import { IconifyIcon } from '@iconify/types';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import { Period, Project, SelectOptions } from '@shared/interfaces/interfaces';

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
  @Output() removeProjectFilter = new EventEmitter<Project>();
  @Output() removeActiveProject = new EventEmitter<void>();
  @Output() changeManagerMainView = new EventEmitter<ManagerDashboardView>();
  @Output() changePeriod = new EventEmitter<Period>();

  readonly iconPinned: IconifyIcon = pinnedIcon;
  readonly iconPinnedOff: IconifyIcon = pinnedOff;
  readonly iconTable: IconifyIcon = tableIcon;
  readonly iconChartArrows: IconifyIcon = chartArrows;

  readonly managerDashboardView = ManagerDashboardView;

  selectProjectOptions: SelectOptions[];
  selectedProject: Project['id'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.managerProjects && this.managerProjects.length) {
      this.selectProjectOptions = this.managerProjects.map((project) => ({
        value: project.id,
        viewValue: project.name,
      }));
    }
  }

  protected getSelectedValue(currentProjectId: string): void {
    this.selectedProject = currentProjectId;
  }

  protected addProjectToFilter(): void {
    if (this.selectedProject) {
      const projectName = this.managerProjects.find(
        (project) => project.id === this.selectedProject
      ).name;
      this.projectFilter.emit(projectName);
      this.selectedProject = '';
    }
  }

  protected removeProjectFromFilter(event: Event, project: Project): void {
    event.stopPropagation();
    this.removeProjectFilter.emit(project);
  }
}
