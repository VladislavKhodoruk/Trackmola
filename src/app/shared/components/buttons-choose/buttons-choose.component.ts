import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
@Component({
  selector: 'app-buttons-choose',
  templateUrl: 'buttons-choose.component.html',
  styleUrls: ['buttons-choose.component.scss'],
})
export class ButtonsChooseComponent implements OnChanges {
  @Input() lables: string[];
  @Input() classes: string[];
  checkedValue: string;
  ngOnChanges(changes: SimpleChanges) {
    this.checkedValue = this.lables[0];
  }
  // constructor(private cd: ChangeDetectorRef) {}
  chooseButton(button) {
    this.checkedValue = button;
    // this.cd.detectChanges();
  }
}
