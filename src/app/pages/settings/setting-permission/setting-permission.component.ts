import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EditRoleComponent } from 'src/app/components/edit-role/edit-role.component';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PermissionService } from 'src/app/shared/services/permission/permission.service';
import { RoleService } from 'src/app/shared/services/permission/role.service';
import { RoleManager } from 'src/app/shared/services/permission/roleManager.service';

@Component({
  selector: 'app-setting-permission',
  templateUrl: './setting-permission.component.html',
  styleUrls: ['./setting-permission.component.scss'],
})
export class SettingPermissionComponent implements OnInit, OnDestroy {
  role: any;
  permission: any;
  sub: any;
  constructor(
    private permissionService: PermissionService,
    private layoutService: LayoutService,
    private roleService: RoleService,
    private roleManager: RoleManager
  ) {}
  ngOnInit(): void {
    this.sub = this.roleManager.getUpdate().subscribe(() => {
      this.refresh();
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  editRole(itemId: number) {
    this.roleManager.sendItem(itemId);
    this.layoutService.updateRightColumnComponent(EditRoleComponent);
  }
  addRole() {
    this.permissionService.GetPermissionUnique().subscribe((data) => {
      this.permission = data.result;
      var permissionlist: any[] = [];
      for (let i in this.permission) {
        const form1 = {
          id: 0,
          creationTime: new Date(),
          creatorUserId: 0,
          tenantId: 0,
          name: this.permission[i].name,
          displayName: this.permission[i].displayName,
          isGranted: false,
          roleId: 0,
        };
        permissionlist = permissionlist.concat(form1);
      }
      let newItem = {
        id: 0,
        creationTime: new Date().toISOString(),
        creatorUserId: 0,
        lastModificationTime: new Date().toISOString(),
        lastModifierUserId: 0,
        isDeleted: false,
        deleterUserId: 0,
        deletionTime: new Date().toISOString(),
        tenantId: 0,
        name: 'new-role',
        displayName: 'new-role',
        isStatic: false,
        isDefault: false,
        description: '',
        permissions: permissionlist,
      };
      this.roleService.createItem(newItem).subscribe((item) => {
        this.role.items.push(item);
        this.refresh();
      });
    });
  }
  refresh() {
    this.layoutService.clearRightColumnComponent();
    this.roleService.getAll().subscribe((data) => {
      this.role = data.result;
      this.role.items = this.role?.items?.reverse();
    });
  }
}
