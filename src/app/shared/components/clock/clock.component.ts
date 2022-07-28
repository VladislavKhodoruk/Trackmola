import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  styleUrls: ['./clock.component.scss'],
  templateUrl: './clock.component.html',
})
export class ClockComponent implements OnInit, OnDestroy {
  time: Date = new Date();
  timeSubscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.timeSubscription = timer(0, 1000)
      .pipe(map(() => new Date()))
      .subscribe((data) => {
        this.time = data;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}
