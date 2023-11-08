import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FbItemService } from '../../shared/services/fbitem/fb-item.service';
import { FBItem } from '../../shared/services/fbitem/fb-item';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit {
  constructor(
    private router: Router,
    private fbItemService: FbItemService,
    private orderManagerService: OrderManagerService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  menu: FBItem[] = [];
  search = new FormControl();
  searchMenu: FBItem[] = [];
  menunew: FBItem[] = [];
  category: any;
  tableSectionId: number;
  ngOnInit(): void {
    this.searchProduct();
    this.getItem();
    this.getCategories();
    this.menunew = this.menu;
  }

  nav = {
    icon: 'chevron_left',
    name: 'Tìm món',
    routers: '/order',
  };

  bamvao() {
    this.router.navigate([`/order`]);
  }

  onAuxclick() {
    this.router.navigate([`/order`]);
  }
  onClick1() {
    this.router.navigate([`/settings`]);
  }
  addItem(item: any) {
    this.orderManagerService.addProduct(item);
  }
  getItem() {
    this.tableSectionId = Number(
      this.activatedRoute.snapshot.paramMap.get('tableSectionId')
    );
    console.log(this.tableSectionId);
    this.fbItemService
      .getAllWithSectionId(this.tableSectionId)
      .subscribe((data) => {
        data.result.forEach((item: any) => {
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
  searchProduct() {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((key) => {
      if (key != '') {
        let newMenu = this.menu.filter((item) =>
          // item.itemName.toLowerCase().includes(key)
          this.toLowerCaseNonAccentVietnamese(
            item.itemName.toLowerCase()
          ).includes(this.toLowerCaseNonAccentVietnamese(key.toLowerCase()))
        );
        this.searchMenu = [...newMenu];
        this.menunew = this.searchMenu;
      } else {
        this.searchMenu = [];
        this.menunew = [];
        this.menunew = this.menu;
      }
      console.log(this.searchMenu);
    });
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
