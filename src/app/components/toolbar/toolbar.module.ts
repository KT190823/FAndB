import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarComponent } from './toolbar.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ToolbarRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
