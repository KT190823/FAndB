import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';
import { SpeedDialFabModule } from '../../components/speed-dial-fab/speed-dial-fab.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';


import { QRCodeModule } from 'angularx-qrcode';

import {register} from 'swiper/element/bundle';
register();


@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    SpeedDialFabModule,
    ToolbarModule,
    QRCodeModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleModule { 
  
}
