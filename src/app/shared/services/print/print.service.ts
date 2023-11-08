import { Capacitor } from '@capacitor/core';
import { PrintNativeService } from './print.native.service';
import { PrintWebService } from './print.web.service';
import { Injectable, OnInit } from '@angular/core';
import {
  PrintInterfaceService,
  PrinterProvider,
} from './print.interface.service';
import { Printer } from '@awesome-cordova-plugins/printer';
import { hubManager } from '../hub-managers/hubManager.service';
import { PrintDesktopService } from './print.desktop.service';
import { PrintMessage } from './print-message.interface';
import { PrintBaseService } from './print.base.service';

const ServiceFactory = (hubManagerService: hubManager) => {
  if (window.navigator.userAgent.indexOf('Electron') >= 0) {
    return new PrintDesktopService(hubManagerService);
  }
  return window['ReactNativeWebView']
    ? new PrintNativeService(hubManagerService)
    : new PrintWebService();
};

@Injectable({
  providedIn: 'root',
  useFactory: ServiceFactory,
  deps: [hubManager],
})
export abstract class PrintService
  extends PrintBaseService
  implements PrintInterfaceService {}
