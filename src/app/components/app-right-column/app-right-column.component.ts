import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceComponent } from '../invoice/invoice.component';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { Observable } from 'rxjs';
import { NodataComponent } from '../nodata/nodata.component';

@Component({
  selector: 'app-right-column',
  templateUrl: './app-right-column.component.html',
  styleUrls: ['./app-right-column.component.scss'],
})
export class AppRightColumnComponent implements AfterViewInit, OnDestroy {
  selectedPortal: Portal<any> | null = null;
  layoutServiceObserable: Observable<any> | any = null;
  constructor(public layoutService: LayoutService) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.layoutServiceObserable = this.layoutService
        .getRightColumnComponent()
        .subscribe((component: any) => {
          if (component) {
            this.selectedPortal = new ComponentPortal(component);
          } else {
            this.selectedPortal = null;
            this.layoutService.updateRightColumnComponent(NodataComponent);
          }
        });
    });
  }
  ngOnDestroy(): void {
    if (this.layoutServiceObserable) {
      this.layoutServiceObserable.unsubscribe();
    }
  }
}
