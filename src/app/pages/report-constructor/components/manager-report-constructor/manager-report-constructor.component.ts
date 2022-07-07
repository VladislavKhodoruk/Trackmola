import { Component } from '@angular/core';
import checksIcon from '@iconify/icons-tabler/checks';
import fileXls from '@iconify-icons/ph/file-xls';

@Component({
  selector: 'app-manager-report-constructor',
  templateUrl: './manager-report-constructor.component.html',
  styleUrls: ['./manager-report-constructor.component.scss'],
})
export class ManagerReportConstructorComponent {
  checksIcon = checksIcon;
  fileXlsIcon = fileXls;
}
