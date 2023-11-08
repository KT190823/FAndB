export { Printer as PrinterProvider } from '@awesome-cordova-plugins/printer/ngx';

export interface PrintInterfaceService {
  print: (
    printerName: string,
    template: string | undefined,
    heightBodyDetails: number
  ) => void;

  listenForPrint();
}
