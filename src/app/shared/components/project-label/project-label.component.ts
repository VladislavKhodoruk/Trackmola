import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-label',
  styleUrls: ['./project-label.component.scss'],
  templateUrl: './project-label.component.html',
})
export class ProjectLabelComponent {
  @Input() projectColor: string;
  @Input() projectName: string;
}
