import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/auth/user/user.service';
import { RoleService } from 'src/app/shared/services/permission/role.service';

@Component({
  selector: 'app-setting-role',
  templateUrl: './setting-role.component.html',
  styleUrls: ['./setting-role.component.scss'],
})
export class SettingRoleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'roleId'];
  users: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  role: any;
  permissionSelect: number[] = [];
  form: FormGroup | any;
  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.createForm();
    this.roleService.getAll().subscribe((data) => {
      this.role = data.result;
    });
    this.userService.getAll().subscribe((data) => {
      this.users = data.result;
      this.dataSource = new MatTableDataSource(data.result.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      data.result.items.forEach((item) => {
        let newUserForm = this.createUserForm();
        this.permissionSelect.push(-1);
        newUserForm.patchValue(item);
        this.userForm.push(newUserForm);
      });
    });
  }

  createForm() {
    let form = this.formBuilder.group({
      userForm: this.formBuilder.array([]),
    });

    return form;
  }

  get userForm() {
    return this.form.controls['userForm'] as FormArray;
  }
  createUserForm() {
    let form = this.formBuilder.group({
      id: [0],
      name: [''],
      userName: [''],
      roleId: [0],
      tenantId: [0],
    });

    return form;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateRole(user: any) {
    this.userService.updateUser(user).subscribe();
  }
}
