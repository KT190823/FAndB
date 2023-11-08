import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionService } from 'src/app/shared/services/table/section.service';
import { TableService } from 'src/app/shared/services/table/table.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  constructor(
    private sectionService: SectionService,
    private tableService: TableService,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  categoryName: string;
  isDrink: boolean;
}
