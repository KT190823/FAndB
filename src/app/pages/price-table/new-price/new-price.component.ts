import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SectionService } from '../../../shared/services/table/section.service';
import { FbItemService } from '../../../shared/services/fbitem/fb-item.service';
import { PriceTableService } from '../../../shared/services/price-table/price-table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FBItem } from '../../../shared/services/fbitem/fb-item';
import { PriceTableDetailService } from 'src/app/shared/services/price-table-detail/price-table-detail.service';

@Component({
  selector: 'app-new-price',
  templateUrl: './new-price.component.html',
  styleUrls: ['./new-price.component.scss'],
})
export class NewPriceComponent implements OnInit {
  areaCtrl = new FormControl('');
  filteredAreas: any[];
  areas: any[] = [];
  allAreas: any[] = [];
  fbItems: any;
  filteredFbItems: any;
  form: FormGroup;
  id: number;

  @ViewChild('areaInput') areaInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    private formBuilder: FormBuilder,
    private sectionService: SectionService,
    private fbItemService: FbItemService,
    private priceTableService: PriceTableService,
    private priceTableDetailService: PriceTableDetailService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = +params.get('id');
      if (this.id > 0) {
        this.priceTableService.getById(this.id).subscribe((data) => {
          this.details.clear();
          data.result.details.forEach((item) =>
            this.details.push(this.createProductForm())
          );
          data.result.priceTable_TableSection_Detail.forEach((item) =>
            this.priceTableSectionDetail.push(this.createTableSectionForm())
          );
          this.form.patchValue(data.result);
          this.priceTableSectionDetail.controls.forEach((detail: any) => {
            this.sectionService
              .getById(detail.get('tableSectionId').value)
              .subscribe((item: any) => {
                this.areas.push(item?.result?.tableSectionName);
              });
          });

          this.priceTableDetailService
            .getAllByPriceTableId(this.id)
            .subscribe((data) => {
              this.details.patchValue(data.result);
            });
        });
      }
    });

    this.areaCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((area: string | null) => {
        if (this.filteredAreas?.length != 0) {
          console.log(this.areas);
          this.filteredAreas = area
            ? this._filter(area)
            : this.allAreas?.slice();
        }
      });

    this.fbItemService.getAll().subscribe((items) => {
      this.fbItems = items.result.items;
      this.filteredFbItems = items.result.items;
    });
    this.sectionService.getAll().subscribe((data) => {
      this.allAreas = [...data.result.items];
      this.filteredAreas = [...data.result.items];
    });
  }

  createForm() {
    let form = this.formBuilder.group({
      id: [0],
      name: [''],
      code: [''],
      fromDate: [''],
      toDate: [''],
      store: [''],
      details: this.formBuilder.array([this.createProductForm()]),
      priceTable_TableSection_Detail: this.formBuilder.array([]),
      priceTable_Tenant_Detail: this.formBuilder.array([]),
    });

    form.controls['store'].disabled;

    return form;
  }

  get details() {
    return this.form.controls['details'] as FormArray;
  }

  get priceTableSectionDetail() {
    return this.form.controls['priceTable_TableSection_Detail'] as FormArray;
  }
  getAreaInfo = (id) => this.allAreas.find((x) => x.id === id);

  createProductForm() {
    let form = this.formBuilder.group({
      id: [0],
      productId: [0],
      productName: [''],
      priceOld: [0],
      price: [0],
      discount: [0],
    });

    form = this.createProductFormConfig(form);

    return form;
  }

  createProductFormConfig(form: any) {
    let discount = form.get('discount') as FormControl;
    let price = form.get('price') as FormControl;
    let productName = form.get('productName') as FormControl;
    discount.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newDiscount: Number | any) => {
        if (newDiscount.dirty) {
          price.setValue((price.value * (100 - newDiscount)) / 100, {
            emitEvent: false,
          });
        }
      });

    productName.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newProductName: string) => {
        if (productName.dirty && productName.value != '') {
          (this.filteredFbItems = this.fbItems.filter((x: FBItem) =>
            this.toLowerCaseNonAccentVietnamese(
              x.itemName.toLowerCase()
            ).includes(
              this.toLowerCaseNonAccentVietnamese(
                newProductName.toLowerCase()
              ).trim()
            )
          )),
            { emitEvent: false };
        } else {
          this.filteredFbItems = this.fbItems;
        }
      });
    return form;
  }

  createTableSectionForm() {
    let form = this.formBuilder.group({
      id: [0],
      priceTableId: [0],
      tableSectionId: [0],
      tableSectionName: [''],
    });

    return form;
  }

  addProductForm() {
    this.details.controls.push(this.createProductForm());
  }

  deleteProduct(indexProductForm: number) {
    this.details.controls.splice(indexProductForm, 1);
  }

  addArea(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const checkArea = this.allAreas.filter((area) =>
      area?.tableSectionName.toLowerCase().includes(value.toLowerCase())
    );
    if (checkArea.length > 0) {
      this.areas.push(value);
    }
    event.chipInput!.clear();

    this.areaCtrl.setValue(null);
  }

  removeArea(area: string): void {
    const index = this.areas.indexOf(area);
    const indexForm = this.priceTableSectionDetail.value.findIndex(
      (item) => item.tableSectionName == area
    );

    if (index >= 0) {
      this.priceTableSectionDetail.removeAt(indexForm);
      this.areas.splice(index, 1);
    }
  }

  selectedArea(event: MatAutocompleteSelectedEvent): void {
    let indexArea = this.filteredAreas.findIndex((area) =>
      area?.tableSectionName
        .toLowerCase()
        .includes(event.option.viewValue.toLowerCase())
    );
    if (indexArea != -1) {
      let newArea = this.createTableSectionForm();
      newArea.patchValue({
        tableSectionId: event.option.value.id,
        tableSectionName: event.option.value.tableSectionName,
      });
      this.priceTableSectionDetail.controls.push(newArea);

      this.areas.push(event.option.viewValue);
      this.areaInput.nativeElement.value = '';
      this.areaCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.allAreas.filter((area) =>
      area?.tableSectionName.toLowerCase().includes(filterValue)
    );
  }

  onSelectProduct(productId: number, indexProductForm: number) {
    this.fbItemService.getById(productId).subscribe((product) => {
      this.details.controls[indexProductForm].patchValue({
        productId: product.result.id,
        priceOld: product.result.unitPrice,
        price: product.result.unitPrice,
        discount: 0,
      });
    });
  }

  onExit() {
    this.router.navigate(['/pages/price-table/list']);
  }

  onSave() {
    if (this.id == 0) {
      this.priceTableService.createItem(this.form.getRawValue()).subscribe();
      alert('Đã tạo mới bảng giá thành công');
    } else {
      this.priceTableService.updateItem(this.form.getRawValue()).subscribe();
      alert('Đã cập nhật bảng giá thành công');
    }
  }

  toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }
}
