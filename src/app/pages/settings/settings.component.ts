import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FbItemService } from '../../shared/services/fbitem/fb-item.service';
import { FBItem } from '../../shared/services/fbitem/fb-item';
import { LayoutService } from '../../shared/services/layout.service';
import { SettingTableComponent } from './setting-table/setting-table.component';
import { SettingProductsComponent } from './setting-products/setting-products.component';
import { SettingService } from '../../shared/services/screen-setting.service';
import { SettingPermissionComponent } from './setting-permission/setting-permission.component';
import { SettingRoleComponent } from './setting-role/setting-role.component';
import { SettingPrintComponent } from './setting-print/setting-print.component';
import { RolePerService } from '../../shared/services/permission/roleper.service';
import { SettingAppComponent } from './setting-app/setting-app.component';
import { SettingPagesService } from 'src/app/shared/services/setting/settingpages.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  order: number;
  today = Date.now();
  lengthSettings: number = 0;
  sub: any[] = [];
  openMenu: boolean = true;
  titlepages: string = 'null';
  constructor(
    private layoutService: SettingService,
    private route: ActivatedRoute,
    private roleperService: RolePerService,

    private settingpagesService: SettingPagesService
  ) {}

  ngOnInit() {
    this.lengthSettings = 0;
    this.route.queryParams.subscribe((params) => {
      this.order = params?.['tab'];
      this.settings(this.order);
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements ' to the class.
    this.sub.forEach((x) => x.unsubscribe());
  }
  settings(key: number) {
    switch (Number(key)) {
      case 1:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa khu vực/bàn';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingTableComponent);
        break;
      case 2:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa thực đơn';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingProductsComponent);
        break;
      case 3:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa Quyền hạn';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingPermissionComponent);
        break;
      case 4:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa Nhân sự';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingRoleComponent);
        break;
      case 5:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa Máy in';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingPermissionComponent);
        break;
      case 8:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa Máy in';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingPrintComponent);
        break;
      case 9:
        this.openMenu = false;
        this.titlepages = 'Chỉnh sửa App';
        this.layoutService.clearSettingComponent();
        this.layoutService.updateSettingComponent(SettingAppComponent);
        break;

      default:
        this.layoutService.clearSettingComponent();
        break;
    }
  }

  canAccess(namePermission: any) {
    let check: boolean = this.roleperService.canCurrentUser(namePermission);

    if (check) {
      this.lengthSettings++;
    }

    return check;
  }

  menu() {
    this.openMenu = true;
    this.titlepages = '';
  }

  pagessetting() {
    this.sub.push(this.settingpagesService.getData().subscribe((data) => {}));
  }
}
