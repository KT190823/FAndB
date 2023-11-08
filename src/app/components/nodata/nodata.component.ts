import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-nodata',
  templateUrl: './nodata.component.html',
  styleUrls: ['./nodata.component.scss'],
})
export class NodataComponent {
  constructor(private pagesService: PagesService) {}
  close() {
    this.pagesService.sendData('');
  }
}
