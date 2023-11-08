import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { OrderManagerService } from '../shared/services/order/order-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../shared/services/setting/setting.service';
import { PagesService } from '../shared/services/pages.service';
import { hubManager } from '../shared/services/hub-managers/hubManager.service';
import { PrintService } from '../shared/services/print/print.service';
import { PrintMessage } from '../shared/services/print/print-message.interface';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  [x: string]: any;
  innerWidth: any;
  fontsize = 42;
  mode: any = 'side';
  hasBackdrop: boolean = false;
  openNav: boolean = false;
  openData: boolean = false;
  sub: any[] = [];
  nameRestaraunt: any;
  addressRestaraunt: any;
  constructor(
    private orderManager: OrderManagerService,
    private router: Router,
    private settingService: SettingService,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private hubManagerService: hubManager,
    private printService: PrintService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add '' to the class.
    this.toolbar();
    this.navright();
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 960) {
      this.mobileSettings();
    } else {
      this.desktopSettings();
    }

    this.printService.listenForPrint();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements ' to the class.

    this.sub.forEach((x) => x.unsubscribe());
  }
  toolbar() {
    this.settingService.getByKey('nameres').subscribe((data) => {
      this.nameRestaraunt = data.result[0].value;
    });
    this.settingService.getByKey('address').subscribe((data) => {
      this.addressRestaraunt = data.result[0].value;
    });
  }
  navright() {
    this.sub.push(
      this.pagesService.getData().subscribe((data) => {
        this.openData = false;
      })
    );
  }
  mobileSettings() {
    this.mode = 'over';
    this.hasBackdrop = true;
    this.openData = false;
    this.openNav = false;

    this.sub.push(
      this.orderManager.getMode().subscribe((mode) => {
        if (mode) {
          this.openData = true;
        }
      })
    );
  }

  desktopSettings() {
    this.mode = 'side';
    this.hasBackdrop = false;
    this.openNav = true;

    this.sub.push(
      this.orderManager.getMode().subscribe((mode) => {
        if (mode) {
          this.openData = true;
        }
      })
    );
  }

  dataright(data: any) {
    this.openData = data;
  }

  home() {
    let url: string = this.route.snapshot['_routerState'].url;
    if (url != '/pages/order') {
      this.router.navigate(['/pages/order']);
    } else {
      // window.location.reload();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 960) {
      this.mobileSettings();
    } else {
      this.desktopSettings();
    }
  }

  @HostListener('click', ['$event.target']) onClick(e) {
    if (this.innerWidth < 960) {
      if (e.classList.contains('mat-drawer-backdrop')) {
        this.openData = false;
      }
    }
  }
}
