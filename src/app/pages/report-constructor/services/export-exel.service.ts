/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import { Observable, of } from 'rxjs';

import { EXEL_HEADER_DEFAULT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ExportExelService {
  exportExel(data: object[]): Observable<any> {
    const date = new Date();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');
    worksheet.addRow(EXEL_HEADER_DEFAULT);

    data.map((item) => worksheet.addRow(Object.values(item)));

    const fname = `Report_${date.toString().slice(4, 24)}`;

    void workbook.xlsx.writeBuffer().then((respons) => {
      const blob = new Blob([respons], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '.xlsx');
    });
    return of();
  }
}
