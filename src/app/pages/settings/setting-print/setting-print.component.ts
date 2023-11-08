import { Component } from '@angular/core';
import { SettingService } from '../../../shared/services/setting/setting.service';
import { FormBuilder } from '@angular/forms';
import { Setting } from 'src/app/shared/services/setting/setting';

@Component({
  selector: 'app-setting-print',
  templateUrl: './setting-print.component.html',
  styleUrls: ['./setting-print.component.scss'],
})
export class SettingPrintComponent {
  printerInputInvoice: string;
  printerInputProcess: string;
  printerInputDrink: string;
  settingss: Setting | any;
  constructor(
    private settingService: SettingService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.settingss = this.createForm();
    this.getValue();
  }
  getValue() {
    this.settingService.getByKey('printerInvoice').subscribe((data) => {
      this.printerInputInvoice = data.result[0]?.value;
    });
    this.settingService.getByKey('printerProcess').subscribe((data) => {
      this.printerInputProcess = data.result[0]?.value;
    });
    this.settingService.getByKey('printerDrink').subscribe((data) => {
      this.printerInputDrink = data.result[0]?.value;
    });
  }
  onSubmit() {
    this.updateValue('printerInvoice', this.printerInputInvoice);
    this.updateValue('printerProcess', this.printerInputProcess);
    this.updateValue('printerDrink', this.printerInputDrink);
    alert('Thay đổi thành công');

    localStorage.setItem(Printer.printerInvoice, this.printerInputInvoice);
    localStorage.setItem(Printer.printerProcess, this.printerInputProcess);
    localStorage.setItem(Printer.printerDrink, this.printerInputDrink);
  }
  updateValue(key: string, valueupdate: any) {
    let newSettings: any = {};

    newSettings.id = key;
    newSettings.key = key;
    newSettings.value = valueupdate;
    this.settingss.patchValue(newSettings);
    this.settingService.updateItem(this.settingss.getRawValue()).subscribe();
  }

  createForm() {
    let form = this.formBuilder.group({
      id: '',
      key: '',
      value: '',
      tenantId: 0,
    });

    return form;
  }
}

enum Printer {
  printerInvoice = 'printerInvoice',
  printerProcess = 'printerProcess',
  printerDrink = 'printerDrink',
}
