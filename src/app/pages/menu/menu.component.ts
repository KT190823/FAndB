import { Component, ViewEncapsulation } from '@angular/core';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  nav = {
    icon: 'menu',
    routers: '/order',
    name: 'Menu',
  };

  menus: Menu[] = [
    { name: 'Coffee', images: '' },
    { name: 'Cake', images: '' },
    { name: 'Bubble Tea', images: '' },
    { name: 'Tea', images: '' },
    {
      name: 'Fruit juice',
      images: '',
    },
    { name: 'Smoothie', images: '' },
  ];
  items: Item[] = [
    {
      name: 'Hazelnut Macchiato',
      money: 1000,
      images: '',
    },
    {
      name: 'Ristretto Bianco',
      money: 1000,
      images: '',
    },
    {
      name: 'Asian Dolce Latte',
      money: 1000,
      images: '',
    },
  ];
  items1: Item[] = [
    {
      name: 'Coffee2',
      money: 1000,
      images: '',
    },
    { name: 'Tea1', money: 1000, images: '' },
    {
      name: 'Fruit juice1',
      money: 1000,
      images: '',
    },
    {
      name: 'Smoothie15',
      money: 1000,
      images: '',
    },
    {
      name: 'Coffee',
      money: 1000,
      images: '',
    },
    {
      name: 'Coffee',
      money: 1000,
      images: '',
    },
  ];

  public bass = this.items;

  a1(a: any) {
    if (a == this.menus[0].name) {
      this.bass = this.items;
    } else {
      this.bass = this.items1;
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(AddComponent);
  }
}

class Menu {
  name: string | undefined;
  images: string | undefined;
}
class Item {
  name: string | undefined;
  money: number | undefined;
  images: string | undefined;
}
class Size {
  name: string | undefined;
  images: string | undefined;
  money: number | undefined;
}
class Toping {
  name: string | undefined;
  money: number | undefined;
}

@Component({
  selector: 'app-menu',
  templateUrl: './add.component.html',
})
export class AddComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<AddComponent>) {}

  sizes: Size[] = [
    { name: 'Basic', money: 0, images: '' },
    {
      name: 'Middle',
      money: 10000,
      images: '',
    },
    {
      name: 'Large',
      money: 15000,
      images: '',
    },
  ];

  toppings: Toping[] = [
    { name: 'Thạch Rau Câu', money: 5000 },
    { name: 'Hạt Thủy Tinh', money: 2000 },
    { name: 'Thạch Pudding', money: 10000 },
    { name: 'Trân châu đen', money: 7000 },
    { name: 'Trân châu trắng', money: 7000 },
  ];

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
