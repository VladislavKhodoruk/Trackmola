/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import { Observable, of } from 'rxjs';

import { EXCEL_HEADER_DEFAULT } from '../constants/constants';
import { ExcelData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExportExelService {
  exportExel(data: ExcelData): Observable<Action> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(`${data.header}`);

    const fname = `Report_${data.header}_${new Date(
      data.period.start
    ).toDateString()}-${new Date(data.period.end).toDateString()}`;
    worksheet.addRow([fname]);
    worksheet.mergeCells('A1', 'E1');
    worksheet.getRow(1).fill = {
      fgColor: { argb: 'e1eaf7' },
      pattern: 'solid',
      type: 'pattern',
    };

    worksheet.addTable({
      columns: EXCEL_HEADER_DEFAULT.map((item, index) => {
        if (index === 2) {
          return {
            name: item,
            totalsRowFunction: 'sum',
          };
        }
        return { name: item };
      }),
      headerRow: true,
      name: `${data.header}`,
      ref: 'A2',
      rows: data.data.map((item) => Object.values(item)),
      style: {
        showRowStripes: false,
        theme: null,
      },
      totalsRow: true,
    });

    worksheet.addRow(['Team', ...data.team]);

    worksheet.getRow(2).height = 25;
    worksheet.getRow(2).fill = {
      fgColor: { argb: 'F3F7FD' },
      pattern: 'solid',
      type: 'pattern',
    };

    for (let i = 1; i <= data.data.length + 4; i++) {
      worksheet.getColumn(i).width = 20;
      worksheet.getRow(i).height = 25;
      worksheet.getColumn(i).alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };
      worksheet.getRow(i).border = {
        bottom: { color: { argb: 'F3F7FD' }, style: 'thin' },
        left: { color: { argb: 'F3F7FD' }, style: 'thin' },
        right: { color: { argb: 'F3F7FD' }, style: 'thin' },
        top: { color: { argb: 'F3F7FD' }, style: 'thin' },
      };

      if (i === data.data.length + 3) {
        worksheet.getRow(i).fill = {
          fgColor: { argb: 'ebe1f7' },
          pattern: 'solid',
          type: 'pattern',
        };
        worksheet.getRow(i + 1).fill = {
          fgColor: { argb: 'f7ede1' },
          pattern: 'solid',
          type: 'pattern',
        };
      }
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
