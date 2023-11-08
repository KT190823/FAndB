import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { SectionService } from 'src/app/shared/services/table/section.service';
import { TableService } from 'src/app/shared/services/table/table.service';
@Component({
  selector: 'app-swap-table',
  templateUrl: './swap-table.component.html',
  styleUrls: ['./swap-table.component.scss'],
})
export class SwapTableComponent {
  option = {
    sections: [],
    tables: [],
  };
  constructor(
    private sectionService: SectionService,
    private tableService: TableService,
    public dialogRef: MatDialogRef<SwapTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.sectionService.getAll().subscribe((sections) => {
      this.option.sections = sections.result.items.reverse();

      this.tableService.getAll().subscribe((tables) => {
        this.option.tables = tables.result.items
          .filter((t) => t.tableSectionId == data.sectionId)
          .reverse();
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSection() {
    this.tableService.getAll().subscribe((tables) => {
      this.option.tables = tables.result.items
        .filter((t) => t.tableSectionId == this.data.sectionId)
        .reverse();
    });
  }
}

export interface DialogData {
  tableId: number;
  sectionId: number;
}
