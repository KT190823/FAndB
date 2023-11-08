import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedDialFabComponent } from './speed-dial-fab.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SpeedDialFabComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  exports: [
    SpeedDialFabComponent
  ]
})
export class SpeedDialFabModule { }
