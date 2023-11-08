import { PrintInterfaceService } from './print.interface.service';
import { PrintService } from './print.service';
import { PrintMessage } from './print-message.interface';
import { PrintBaseService } from './print.base.service';

export class PrintWebService
  extends PrintBaseService
  implements PrintInterfaceService
{
  constructor() {
    super();
  }
  override print() {
    this.printQueue.forEach((printer: PrintMessage) => {
      let newWin = window.open(
        '',
        '',
        `left=0,top=0,width=800 ,height=900,toolbar=0,scrollbars=0,status=0`
      );
      let style = `<style>
          @media print {
            @page {
              size: 100mm ${printer.heightBodyDetails!}mm; /* landscape */
              /* you can also specify margins here: */
            }
          }
        </style>`;
      newWin?.document.write('<head>' + style + '</head>');
      newWin?.document.write(
        "<body style='width:100%; margin:0'>" + printer.template + '</body>'
      );
      newWin?.print();
      newWin?.close();
    });

    this.printQueue = [];
  }
}
