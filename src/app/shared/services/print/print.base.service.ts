import { PrintMessage } from './print-message.interface';
import { PrintInterfaceService } from './print.interface.service';

export abstract class PrintBaseService implements PrintInterfaceService {
  protected printQueue: PrintMessage[] = [];

  public addQueue(message: PrintMessage) {
    this.printQueue.push(message);
  }
  abstract print(): void;
  public listenForPrint() {}
}
