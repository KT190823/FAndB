import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoleRoutingModule } from './edit-role-routing.module';
import { EditRoleComponent } from './edit-role.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [EditRoleComponent],
  imports: [
    CommonModule,
    EditRoleRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
})
export class EditRoleModule {}
