import { Component, OnInit } from '@angular/core';
import check from '@iconify/icons-tabler/check';
import arrowNarrowLeft from '@iconify/icons-tabler/arrow-narrow-left';
import arrowNarrowRight from '@iconify/icons-tabler/arrow-narrow-right';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss'],
})
export class ReportHeaderComponent implements OnInit {
  iconCheck = check;
  iconArrowNarrowLeft = arrowNarrowLeft;
  iconArrowNarrowRight = arrowNarrowRight;
  constructor() {}

  ngOnInit(): void {}
}
