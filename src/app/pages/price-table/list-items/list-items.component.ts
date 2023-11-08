import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteItemComponent } from 'src/app/components/dialog/delete-item/delete-item.component';
import { PriceTableService } from 'src/app/shared/services/price-table/price-table.service';
@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'startDate',
    'endDate',
    'store',
    'edit',
  ];
  listPriceTables: any;

  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private router: Router,
    private priceTableService: PriceTableService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.priceTableService.getAll().subscribe((data) => {
      this.listPriceTables = data.result.items;

      this.dataSource = new MatTableDataSource(this.listPriceTables);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  createNew() {
    if (this.selection.selected && this.selection.selected.length == 0) {
      this.router.navigate(['/pages/price-table/0']);
    } else {
      this.selection.selected.forEach((row) => {
        row.id = 0;
        this.priceTableService.createItem(row).subscribe(() => {
          this.getItems();
        });
      });
    }
  }

  editItem(id: number) {
    this.router.navigate([`pages/price-table/${id}`]);
  }

  deleteItem(itemId: number) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { delete: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.priceTableService
          .deleteItem(itemId)
          .subscribe(() => this.getItems());
      }
    });
  }
}
