import { Component, Input } from '@angular/core';
import { BASIC_OPTIONS_ACTIVITY_CHART_PIE } from '@pages/activity/constants/constants';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';
import { Options, SeriesOptionsType } from 'highcharts';

@Component({
  selector: 'app-projects-activity',
  templateUrl: './projects-activity.component.html',
  styleUrls: ['./projects-activity.component.scss'],
})
export class ProjectsActivityComponent {
  @Input() myActivityProjects: Project[];
  @Input() myActivityTaskTracks: TaskTrack[];

  readonly basicOptions: Options = BASIC_OPTIONS_ACTIVITY_CHART_PIE;

  protected get seriesData(): SeriesOptionsType[] {
    if (this.myActivityProjects.length && this.myActivityTaskTracks.length) {
      return [
        {
          type: 'pie',
          data: this.dataForChart(
            this.myActivityProjects,
            this.myActivityTaskTracks
          ),
        },
      ];
    }
    return [];
  }

  private dataForChart(
    project?: Project[],
    taskTracks?: TaskTrack[]
  ): [string, number][] {
    const projectsNames: { id: Project['id']; name: Project['name'] }[] =
      project.map(({ name, id }) => ({ id, name }));

    return projectsNames.map(({ name, id }) => {
      const tasksInProject: TaskTrack[] = taskTracks.filter(
        ({ projectId }) => projectId === id
      );
      const percent: number = tasksInProject.length / taskTracks.length;
      return [name, percent];
    });
  }
}
