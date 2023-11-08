import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SectionService } from 'src/app/shared/services/table/section.service';
import { TableService } from 'src/app/shared/services/table/table.service';

@Component({
  selector: 'app-setting-table',
  templateUrl: './setting-table.component.html',
  styleUrls: ['./setting-table.component.scss'],
})
export class SettingTableComponent implements OnInit {
  form: any;
  constructor(
    private sectionService: SectionService,
    private tableService: TableService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.getSections();
  }

  createForm() {
    let form = this.formBuilder.group({
      formSections: this.formBuilder.array([]),
    });

    return form;
  }

  get formSections() {
    return this.form.controls['formSections'] as FormArray;
  }

  createFormSection() {
    let form = this.formBuilder.group({
      id: [0],
      tableSectionName: [''],
      formTables: this.formBuilder.array([]),
    });

    form = this.createFormSectionConfig(form);

    return form;
  }

  createFormTable() {
    let form = this.formBuilder.group({
      id: [0],
      tableName: [''],
      tableSectionId: [0],
    });

    return form;
  }
  createFormSectionConfig(form: any) {
    let tableSectionName: any = form.get('tableSectionName') as FormControl;

    tableSectionName.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newDescription: string) => {
        tableSectionName.setValue(newDescription, { emitEvent: false });
        if (tableSectionName.dirty) {
          this.sectionService
            .updateSection(form.getRawValue())
            .pipe(debounceTime(500))
            .subscribe();
        }
      });
    return form;
  }

  getSections() {
    this.sectionService.getAll().subscribe((data) => {
      data.result.items.reverse().forEach((element) => {
        let newSection = this.createFormSection();
        newSection.patchValue(element);
        this.formSections.push(newSection);
      });
      this.getTables();
    });
  }

  getSectionById(id: number) {
    return this.formSections.controls.find((s: any) => s.get('id').value == id);
  }

  getTables() {
    this.tableService.getAll().subscribe((data) => {
      data.result.items.forEach((table) => {
        this.formSections.controls.forEach((section: any) => {
          if (table.tableSectionId == section.get('id').value) {
            let newForm = this.createFormTable();
            newForm.patchValue(table);
            section.controls['formTables'].push(newForm);
          }
        });
      });
    });
  }

  getLastTable(sectionId: number) {
    let section: FormGroup | any = this.getSectionById(sectionId);
    let table = section.get('formTables').controls[0];

    return table;
  }

  btnMinus(sectionId: number) {
    let table = this.getLastTable(sectionId);
    let section: any = this.getSectionById(sectionId);
    if (!table) {
      return;
    }
    this.tableService.deleteTable(table.get('id').value).subscribe(() => {
      section?.get('formTables').controls.shift();
    });
  }

  btnAdd(sectionId: number) {
    let section: any = this.getSectionById(sectionId);
    let form = this.createFormTable();
    form.get('tableSectionId')?.setValue(sectionId);
    form
      .get('tableName')
      ?.setValue(section?.get('formTables').controls.length + 1);

    this.tableService.createTable(form.value).subscribe((newTable) => {
      form.patchValue(newTable.result);
      section?.get('formTables').controls.unshift(form);
    });
  }

  addSection() {
    this.sectionService
      .createSection(this.createFormSection()?.value)
      .subscribe((data) => {
        let newForm = this.createFormSection();
        newForm.patchValue(data.result);
        this.formSections.controls.push(newForm);
      });
  }

  deleteSection(sectionId: number) {
    let section: any = this.getSectionById(sectionId);
    let index = this.formSections.controls.indexOf(section);
    if (section) {
      this.sectionService
        .deleteSection(section.get('id').value)
        .subscribe(() => {
          this.formSections.removeAt(index);
          this.deleteTableBySectionId(section.get('id').value);
        });
    }
  }

  deleteTableBySectionId(sectionId: number) {
    let listDeleteTables: any[] = [];
    this.tableService.getAll().subscribe((tables) => {
      tables.result.items.forEach((table) => {
        if (table?.tableSectionId == sectionId) {
          listDeleteTables.push(table?.id);
        }
      });
      listDeleteTables.forEach((tableId) => {
        this.tableService.deleteTable(tableId).subscribe();
      });
    });
  }
}
