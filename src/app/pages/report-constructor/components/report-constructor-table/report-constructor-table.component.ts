import { Component, OnInit } from '@angular/core';
import sortDescending from '@iconify/icons-tabler/sort-descending';

@Component({
  selector: 'app-report-constructor-table',
  templateUrl: './report-constructor-table.component.html',
  styleUrls: ['./report-constructor-table.component.scss']
})
export class ReportConstructorTableComponent implements OnInit {
  sortDescendingIcon = sortDescending;

  constructor() { }

  ngOnInit(): void {
  }

}
