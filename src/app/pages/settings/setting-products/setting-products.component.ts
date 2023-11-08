import { Component, OnDestroy, OnInit } from '@angular/core';
import { FBItem } from '../../../shared/services/fbitem/fb-item';
import { FbItemService } from '../../../shared/services/fbitem/fb-item.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { EditProductsComponent } from '../../../components/edit-products/edit-products.component';
import { FbItemManager } from '../../../shared/services/fbitem/fbItemManager.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { OrderManagerService } from '../../../shared/services/order/order-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../../components/dialog/add-category/add-category.component';

@Component({
  selector: 'app-setting-products',
  templateUrl: './setting-products.component.html',
  styleUrls: ['./setting-products.component.scss'],
})
export class SettingProductsComponent implements OnDestroy, OnInit {
  constructor(
    private fbItemService: FbItemService,
    private layoutService: LayoutService,
    private fbItemManager: FbItemManager,
    private categoryService: CategoryService,
    private orderManger: OrderManagerService,
    private dialog: MatDialog
  ) {}
  menu: FBItem[] = [];
  editId: number;
  sub: any[] = [];
  category: any[];
  newCategory: any;
  ngOnInit(): void {
    this.layoutService.clearRightColumnComponent();
    this.filterData();
    this.sub.push(
      this.fbItemManager.getIdItem().subscribe((id) => {
        if (id) {
          this.menu = [];
          this.filterData();
          this.fbItemManager.sendIdItem(null);
        }
      })
    );
    this.getCategories();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add '' to the class.
    this.sub.forEach((x) => x.unsubscribe());
  }

  edit(itemId?: number) {
    this.layoutService.updateRightColumnComponent(EditProductsComponent);
    this.fbItemManager.sendItem(itemId);
    this.orderManger.sendMode('trigger');
  }

  filterData() {
    this.fbItemService.getAll().subscribe((data) => {
      data.result.items.forEach((item: any) => {
        this.menu.push(item);
      });
      this.menu.sort((a, b) => a.id - b.id);
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.category = data.result.items;
    });
  }
  onAddCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      data: { categoryName: '', isDrink: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.newCategory = {
          id: 0,
          categoryName: result.categoryName,
          isDrink: result.isDrink
        };
        this.categoryService.createItem(this.newCategory).subscribe((item) => {
          this.category.push(item.result);
        });
        
      }
    });
  }
}
