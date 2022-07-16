export class TableHeadItem {
  name: string;
  columnName: string;
  columnType: string;
  icon: boolean;

  constructor(
    name: string,
    columnName: string,
    columnType: string,
    icon: boolean
  ) {
    this.name = name;
    this.columnName = columnName;
    this.columnType = columnType;
    this.icon = icon;
  }
}
