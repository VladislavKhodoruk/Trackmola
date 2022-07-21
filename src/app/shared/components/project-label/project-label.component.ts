import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-label',
  templateUrl: './project-label.component.html',
  styleUrls: ['./project-label.component.scss'],
})
export class ProjectLabelComponent {
  @Input() projectColor!: string;
  @Input() projectName!: string;
}
