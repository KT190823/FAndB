import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-form-control-chip',
  templateUrl: './form-control-chip.component.html',
  styleUrls: ['./form-control-chip.component.scss']
})
export class FormControlChipComponent implements OnInit{
  areaCtrl = new FormControl('');
  filteredAreas: any[];
  @Input() areasSelect: any[] = [];
  @Input() allAreas: any[] = [];

  ngOnInit(): void {
    this.areaCtrl.valueChanges.pipe(debounceTime(500)).subscribe((area: string | null) => {
      this.filteredAreas = area ? this._filter(area) : this.allAreas?.slice()
    });
  }

  addArea(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const checkArea = this.allAreas.filter(area => area?.tableSectionName.toLowerCase().includes(value.toLowerCase()));
    if (checkArea.length > 0) {
      this.areasSelect.push(value);
    }
    event.chipInput!.clear();

    this.areaCtrl.setValue(null);
  }

  removeArea(area: string): void {
    const index = this.areasSelect.indexOf(area);
    // const indexForm = this.priceTableSectionDetail.value.findIndex(
    //   (item) => item.tableSectionName == area
    // );

    if (index >= 0) {
      // this.priceTableSectionDetail.removeAt(indexForm);
      this.areasSelect.splice(index, 1);
    }
  }

  cancelArea(areaRestore: string){
    let indexArea = this.allAreas.findIndex(area => area?.tableSectionName?.toLowerCase().includes(areaRestore.toLowerCase()));
    this.filteredAreas.push(this.allAreas[indexArea]);
  }

  selectedArea(event: MatAutocompleteSelectedEvent): void {
    let indexArea = this.allAreas.findIndex(area => area?.tableSectionName.toLowerCase().includes(event.option.viewValue.toLowerCase()));
    if(indexArea != -1){
      // let newArea = this.createTableSectionForm();
      // newArea.patchValue({
      //   tableSectionId: event.option.value.id,
      //   tableSectionName: event.option.value.tableSectionName,
      // });
      // this.priceTableSectionDetail.controls.push(newArea);

      // this.areasSelect.push(event.option.viewValue);
      // this.areaInput.nativeElement.value = '';
      this.areaCtrl.setValue(null);
      
      this.filteredAreas.slice(indexArea, 1);
      console.log(this.filteredAreas.length)
    }
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.allAreas.filter((area) =>
      area?.tableSectionName.toLowerCase().includes(filterValue)
    );
  }
}
