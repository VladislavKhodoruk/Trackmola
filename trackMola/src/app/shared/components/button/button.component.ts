import { Component, OnInit } from '@angular/core';
import check from '@iconify/icons-tabler/check';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  iconCheck = check;
  constructor() {}

  ngOnInit(): void {}
}
