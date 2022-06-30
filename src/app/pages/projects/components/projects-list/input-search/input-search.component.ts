import { Component, EventEmitter, Input, Output } from '@angular/core';
import searchIcon from '@iconify/icons-tabler/search';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Input() searchText: string;

  @Output() search = new EventEmitter<string>();
  @Output() focusEvent = new EventEmitter<void>();

  readonly iconSearch = searchIcon;
}
