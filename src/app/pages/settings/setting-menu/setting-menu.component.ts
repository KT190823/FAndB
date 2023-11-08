import { Portal, ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NodataComponent } from 'src/app/components/nodata/nodata.component';
import { SettingService } from 'src/app/shared/services/screen-setting.service';
import { SettingTableComponent } from '../setting-table/setting-table.component';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss']
})
export class SettingMenuComponent implements AfterViewInit, OnDestroy {
  selectedPortal1: Portal<any> | null = null;
  layoutServiceObserable: Observable<any> | any = null;
  constructor(public layoutService: SettingService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.layoutServiceObserable = this.layoutService
        .getSettingComponent()
        .subscribe((component: any) => {
          if (component) {
            this.selectedPortal1 = new ComponentPortal(component);
          } else {
            this.selectedPortal1 = null;
            this.layoutService.updateSettingComponent(SettingTableComponent);
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
