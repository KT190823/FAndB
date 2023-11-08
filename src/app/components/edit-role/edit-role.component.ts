import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PermissionService } from 'src/app/shared/services/permission/permission.service';
import { RoleService } from 'src/app/shared/services/permission/role.service';
import { RoleManager } from 'src/app/shared/services/permission/roleManager.service';
import { RolePerService } from 'src/app/shared/services/permission/roleper.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit, OnDestroy {
  form: FormGroup | any;
  group: any;
  category: any;
  sub: any[] = [];
  permission: any;
  abc: any;

  constructor(
    private formBuilder: FormBuilder,
    private roleManager: RoleManager,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private roleper: RolePerService,
    private layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.sub.push(
      this.roleManager.getItem().subscribe((data) => {
        this.roleService.getById(data).subscribe((data: any) => {
          data.result.permissions.forEach((ele) =>
            this.form.controls['permissions'].push(this.createPermissionForm())
          );
          this.form.patchValue(data.result);
          this.permissionService.GetPermissionUnique().subscribe((data) => {
            this.permission = data.result;
            this.updatePermisson();
          });
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  createForm() {
    const form = this.formBuilder.group({
      id: [0],
      creationTime: [new Date()],
      creatorUserId: [0],
      lastModificationTime: [new Date()],
      lastModifierUserId: [0],
      isDeleted: true,
      deleterUserId: [0],
      deletionTime: [new Date()],
      tenantId: [0],
      name: [''],
      displayName: [''],
      isStatic: true,
      isDefault: true,
      permissions: this.formBuilder.array([]),
    });
    return form;
  }
  createPermissionForm() {
    const form = this.formBuilder.group({
      id: [0],
      creationTime: [new Date()],
      creatorUserId: [0],
      tenantId: [0],
      name: [''],
      displayName: [''],
      isGranted: [false],
      roleId: [0],
    });
    return form;
  }

  updatePermisson() {
    if (this.form.value.permissions.length < this.permission.length) {
      for (let index in this.permission) {
        for (let index1 in this.form.value.permissions) {
          this.permission = this.permission.filter(
            (data) => data != this.form.value.permissions[index1].name
          );
        }
      }
      var bien: any[] = [];
      for (let i in this.permission) {
        const form1 = {
          id: 0,
          creationTime: new Date(),
          creatorUserId: 0,
          tenantId: 0,
          name: this.permission[i].name,
          displayName: this.permission[i].displayName,
          isGranted: false,
          roleId: this.form.value.id,
        };
        bien = bien.concat(form1);
        // this.permissionService.createItem(form1).subscribe();
      }
    }
  }

  update() {
    this.form?.get('permissions').value.forEach((permission: any) => {
      if (permission.isGranted) {
        this.roleper.addPermission(permission.name);
      } else {
        this.roleper.removePermission(permission.name);
      }
    });
    this.roleService.updateItem(this.form.value).subscribe(() => {
      this.roleManager.sendUpdate(1);
    });
  }

  deleteRole(){
    this.roleService.deleteItem(this.form.get('id').value).subscribe();
    this.roleManager.sendUpdate(1);
    this.layoutService.clearRightColumnComponent();
  }
}
