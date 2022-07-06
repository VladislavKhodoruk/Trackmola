import { Component, OnInit } from '@angular/core';
import x from '@iconify/icons-tabler/x';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  x = x;
  constructor() {}

  ngOnInit(): void {}
}
