import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { FbItemService } from 'src/app/shared/services/fbitem/fb-item.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { ItemGroupService } from 'src/app/shared/services/itemGroup/item-group.service';
import { FbItemManager } from 'src/app/shared/services/fbitem/fbItemManager.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit, OnDestroy {
  form: FormGroup | any;
  group: any;
  category: any;
  sub: any;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private fbItemService: FbItemService,
    private fbItemManager: FbItemManager,
    private itemGroupService: ItemGroupService,
    private categoryService: CategoryService,
    private imageService: ImageService,

    private pagesService: PagesService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.getCategories();
    this.getItemGroups();
    this.sub = this.fbItemManager.getItem().subscribe((id: any) => {
      if (id) {
        this.fbItemService.getById(id).subscribe((item: any) => {
          this.form.patchValue(item.result);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createForm() {
    const form = this.formBuilder.group({
      id: [0],
      itemCode: [''],
      itemName: [''],
      categoryId: [],
      description: [''],
      unit: [''],
      unitPrice: [''],
      imagePath1: [''],
      imagePath2: [''],
      imagePath3: [''],
      imagePath4: [''],
      itemGroupId: [],
    });
    return form;
  }

  // Image Preview
  showPreview(event) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('formFile', file);
    this.imageService.createUrlImage(formData).subscribe((data) => {
      this.form.get('imagePath1').setValue(data.result);
    });
  }

  clearData(data: string | any) {
    this.form.get(data).setValue('');
  }

  deleteProduct() {
    this.fbItemService.deleteItem(this.form.get('id').value).subscribe(() => {
      this.fbItemManager.sendIdItem(0);
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.category = data.result.items;
    });
  }

  getItemGroups() {
    this.itemGroupService.getAll().subscribe((data) => {
      this.group = data.result.items;
    });
  }

  onSubmit() {
    if (this.form.get('id').value == 0) {
      this.close();
      this.fbItemService.createItem(this.form.value).subscribe();
      alert('Thêm món thành công!');
    } else {
      this.fbItemService.updateItem(this.form.value).subscribe((data) => {
        this.close();
        this.fbItemManager.sendIdItem(data.result.id);
        alert('Chỉnh sửa món thành công!');
      });
    }
  }

  close() {
    this.pagesService.sendData('Chỉnh sửa nhân sự');
  }
}
