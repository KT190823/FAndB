export interface OrderLog {
  id: number;
  tableName: string;
  dateOfLog: Date;
  columnName: string;
  columnValue: string;
  rowId: number;
  description: string;
}
