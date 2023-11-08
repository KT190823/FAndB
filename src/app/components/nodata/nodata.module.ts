import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodataRoutingModule } from './nodata-routing.module';
import { NodataComponent } from './nodata.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NodataComponent],
  imports: [
    CommonModule,
    NodataRoutingModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
  ],
})
export class NodataModule {}
