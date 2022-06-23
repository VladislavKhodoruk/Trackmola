import { Component, OnInit } from '@angular/core';
import searchIcon from '@iconify/icons-tabler/search';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  icon = searchIcon;
  constructor() {}
  ngOnInit(): void {}
}
