/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import { Observable, of } from 'rxjs';

import { EXEL_HEADER_DEFAULT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ExportExelService {
  exportExel(data: object[]): Observable<Action> {
    const date = new Date();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');

    const fname = `Report_${date.toString().slice(4, 24)}`;

    worksheet.addTable({
      name: 'Report',
      ref: 'A1',
      headerRow: true,
      totalsRow: true,
      style: {
        theme: null,
        showRowStripes: false,
      },
      columns: EXEL_HEADER_DEFAULT.map((item, index) => {
        if (index === 2) {
          return {
            name: item,
            totalsRowFunction: 'sum',
          };
        }
        return { name: item };
      }),
      rows: data.map((item) => Object.values(item)),
    });

    worksheet.getRow(1).height = 25;
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F3F7FD' },
    };

    for (let i = 1; i <= EXEL_HEADER_DEFAULT.length; i++) {
      worksheet.getColumn(i).width = 20;
      worksheet.getColumn(i).alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };
      worksheet.getRow(i).height = 25;
    }

    void workbook.xlsx.writeBuffer().then((respons) => {
      const blob = new Blob([respons], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '.xlsx');
    });
    return of();
  }
}
