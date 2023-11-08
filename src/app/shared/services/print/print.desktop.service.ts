import { PrintInterfaceService } from './print.interface.service';
import { sendMessage } from '../../../../../Electron/renderer';
import { hubManager } from '../hub-managers/hubManager.service';
import { PrintMessage } from './print-message.interface';
import { PrintBaseService } from './print.base.service';

export class PrintDesktopService
  extends PrintBaseService
  implements PrintInterfaceService
{
  constructor(private hubManagerService: hubManager) {
    super();
  }
  override listenForPrint() {
    this.hubManagerService.initConnect(() => {
      this.hubManagerService.receiveTemplatePrint((templateMessage) => {
        if (templateMessage) {
          let data = JSON.parse(templateMessage) as PrintMessage[];
          data.forEach((d) => {
            this.addQueue(d);
          });
          this.print();
        }
      });
    });
  }
  override print() {
    console.log('desktop');
    sendMessage(this.printQueue);
    this.printQueue = [];
  }
}
