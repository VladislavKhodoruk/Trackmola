import { Component, Input } from '@angular/core';

import { Options, SeriesOptionsType } from 'highcharts';

import { BASIC_OPTIONS_ACTIVITY_CHART_PIE } from '@pages/activity/constants/constants';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects-activity',
  styleUrls: ['./projects-activity.component.scss'],
  templateUrl: './projects-activity.component.html',
})
export class ProjectsActivityComponent {
  @Input() readonly myActivityProjects: Project[];
  @Input() readonly myActivityTaskTracks: TaskTrack[];

  readonly basicOptions: Options = BASIC_OPTIONS_ACTIVITY_CHART_PIE;

  protected get seriesData(): SeriesOptionsType[] {
    if (this.myActivityProjects.length && this.myActivityTaskTracks.length) {
      return [
        {
          data: this.dataForChart(
            this.myActivityProjects,
            this.myActivityTaskTracks
          ),
          type: 'pie',
        },
      ];
    }
    return [];
  }

  private dataForChart(
    project?: Project[],
    taskTracks?: TaskTrack[]
  ): [string, number, string][] {
    const projectsNames: {
      id: Project['id'];
      name: Project['name'];
      color: Project['color'];
    }[] = project.map(({ name, id, color }) => ({ color, id, name }));

    return projectsNames.map(({ name, id, color }) => {
      const tasksInProject: TaskTrack[] = taskTracks.filter(
        ({ projectId }) => projectId === id
      );
      const percent: number = tasksInProject.length / taskTracks.length;
      return [name, percent, color];
    });
  }
}
