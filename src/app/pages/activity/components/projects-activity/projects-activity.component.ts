import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BASIC_OPTIONS_ACTIVITY_CHART_PIE } from '@pages/activity/constants/constants';
import { Project, Task } from '@shared/interfaces/interfaces';
import { Options, SeriesOptionsType } from 'highcharts';

@Component({
  selector: 'app-projects-activity',
  templateUrl: './projects-activity.component.html',
  styleUrls: ['./projects-activity.component.scss'],
})
export class ProjectsActivityComponent implements OnChanges {
  @Input() activityProjects: Project[];
  @Input() activityTasks: Task[];

  readonly basicOptions: Options = BASIC_OPTIONS_ACTIVITY_CHART_PIE;

  seriesData: SeriesOptionsType[];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.activityProjects || changes.activityTasks) &&
      this.activityProjects.length &&
      this.activityTasks.length
    ) {
      this.seriesData = [
        {
          type: 'pie',
          data: this.dataForChart(this.activityProjects, this.activityTasks),
        },
      ];
    }
  }

  private dataForChart(
    project?: Project[],
    tasks?: Task[]
  ): [string, number][] {
    const projectsNames: { id: Project['id']; name: Project['name'] }[] =
      project.map(({ name, id }) => ({ id, name }));
    return projectsNames.map(({ name, id }) => {
      const tasksInProject: Task[] = tasks.filter(
        ({ projectId }) => projectId === id
      );
      const percent: number = tasksInProject.length / tasks.length;
      return [name, percent];
    });
  }
}
