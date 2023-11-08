import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Setting } from 'src/app/shared/services/setting/setting';
import { SettingService } from 'src/app/shared/services/setting/setting.service';

@Component({
  selector: 'app-setting-app',
  templateUrl: './setting-app.component.html',
  styleUrls: ['./setting-app.component.scss'],
})
export class SettingAppComponent implements OnInit {
  valuepx = 20;
  nameRestaraunt: any;
  addressRestaraunt: any;
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
    this.settingService.getByKey('nameres').subscribe((data) => {
      this.nameRestaraunt = data.result[0].value;
    });
    this.settingService.getByKey('address').subscribe((data) => {
      this.addressRestaraunt = data.result[0].value;
    });
  }
  onSubmit() {
    this.updateValue('nameRes', this.nameRestaraunt);
    this.updateValue('address', this.addressRestaraunt);
    alert('Thay đổi thành công');
  }
  updateValue(key: string, valueupdate: any) {
    let newSettings: any = {};

    newSettings.id = key;
    newSettings.key = key;
    newSettings.value = valueupdate;
    this.settingss.patchValue(newSettings);
    this.settingService.updateItem(this.settingss.getRawValue()).subscribe();
  }

  formatLabel(value: number): string {
    if (value >= 10) {
      return Math.round(value) + 'px';
    }

    return `${value}`;
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
