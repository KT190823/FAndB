import { Injectable } from '@angular/core';
import {
  PrintInterfaceService,
  PrinterProvider,
} from './print.interface.service';
import { Printer } from '@awesome-cordova-plugins/printer/index';
import { hubManager } from '../hub-managers/hubManager.service';
import { PrintMessage } from './print-message.interface';
import { PrintService } from './print.service';
import { PrintBaseService } from './print.base.service';

export class PrintNativeService
  extends PrintBaseService
  implements PrintInterfaceService
{
  constructor(private hubManagerService?: hubManager) {
    super();
  }

  override print() {
    // window["ReactNativeWebView"] && window["ReactNativeWebView"].postMessage(JSON.stringify({"key": "print", "url": `${printerName}`, "template": template}));
    // const printer: Printer = Printer.getPlugin();
    // // printer.pick().then
    // printer.print(template, {
    //   // printer: `http://${printerName}`,
    //   pageCount: 1,
    // });
    try {
      this.hubManagerService?.sendTemplatePrint(
        JSON.stringify(this.printQueue)
      );
      this.printQueue = [];
    } catch (err) {
      // alert(err);
    }
  }
}
