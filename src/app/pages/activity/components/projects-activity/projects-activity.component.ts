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
  @Input() activityProjects: Project[];
  @Input() activityTasks: TaskTrack[];

  readonly basicOptions: Options = BASIC_OPTIONS_ACTIVITY_CHART_PIE;

  protected get seriesData(): SeriesOptionsType[] {
    if (this.activityProjects.length && this.activityTasks.length) {
      return [
        {
          type: 'pie',
          data: this.dataForChart(this.activityProjects, this.activityTasks),
        },
      ];
    }
    return [];
  }

  private dataForChart(
    project?: Project[],
    tasks?: TaskTrack[]
  ): [string, number][] {
    const projectsNames: { id: Project['id']; name: Project['name'] }[] =
      project.map(({ name, id }) => ({ id, name }));

    return projectsNames.map(({ name, id }) => {
      const tasksInProject: TaskTrack[] = tasks.filter(
        ({ projectId }) => projectId === id
      );
      const percent: number = tasksInProject.length / tasks.length;
      return [name, percent];
    });
  }
}
