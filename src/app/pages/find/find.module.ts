import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindRoutingModule } from './find-routing.module';
import { FindComponent } from './find.component';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FindComponent],
  imports: [
    CommonModule,
    FindRoutingModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    ToolbarModule,
    MatRippleModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FindModule {}
