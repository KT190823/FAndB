import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { PrintService } from '../print/print.service';
import { PrintMessage } from '../print/print-message.interface';
import { HubConnectionState } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class hubManager {
  connection: signalR.HubConnection;

  constructor() {}
  initConnect(callback: () => void = () => {}) {
    console.log(this.connection, 11111);
    if (this.connection == undefined) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5000/api/chatter', {
          skipNegotiation: false,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }
    if (this.connection.state !== HubConnectionState.Connected) {
      this.connection
        .start()
        .then(() => {
          console.log(this.connection.connectionId);
          callback();
        })
        .catch((err) => document.write(err));
    } else {
      callback();
    }
  }

  receiveInvoiceMessage(callback: any) {
    this.connection.on('InvoiceMessage', (invoiceMessage: string) => {
      console.log(invoiceMessage);
      callback();
    });
  }

  receiveProcessMessage(callback: any) {
    this.connection.on('ProcessMessage', (processMessage: string) => {
      console.log(processMessage);
      callback();
    });
  }

  receiveTemplatePrint(
    callback: (templateMessage) => void = (templateMessage) => {}
  ) {
    this.connection.on('TemplateMessage', (templateMessage: string) => {
      callback(templateMessage);
    });
  }

  sendPrintInvoice(message: any) {
    this.connection.invoke('SendPrintInvoice', message).catch((err) => {
      return console.error(err.toString());
    });
  }
  sendPrintProcess(message: any) {
    this.connection.invoke('SendProcessInvoice', message).catch((err) => {
      return console.error(err.toString());
    });
  }
  sendTemplatePrint(printMess: string): void {
    this.connection.invoke('SendTemplatePrint', printMess).catch((err) => {
      return console.error(err.toString());
    });
  }
}
