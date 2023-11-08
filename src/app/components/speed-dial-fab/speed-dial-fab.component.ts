import { Component, Input, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations,
})
export class SpeedDialFabComponent implements OnInit {
  constructor(private router: Router) {}
  @Input()
  public options: any;
  public buttons: Button1[] = [];
  public fabTogglerState = 'inactive';

  public ngOnInit() {
    const maxButtons = 6;
    if (this.options.buttons.length > maxButtons) {
      this.options.buttons.splice(5, this.options.buttons.length - maxButtons);
    }
  }

  public showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.options.buttons;
  }

  public hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  public toggle() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  public nav(nav: string) {
    this.router.navigate([nav]);
  }
}
class Button1 {
  icon: string | undefined;
  routers!: string;
}
