import { Component, EventEmitter, Input, Output } from '@angular/core';
import searchIcon from '@iconify/icons-tabler/search';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Input() searchText: string;

  @Output() searchEmitter = new EventEmitter<string>();
  @Output() focusEmitter = new EventEmitter<void>();

  icon = searchIcon;

  public search() {
    this.searchEmitter.emit(this.searchText);
  }

  public focus() {
    this.focusEmitter.emit();
  }
}
