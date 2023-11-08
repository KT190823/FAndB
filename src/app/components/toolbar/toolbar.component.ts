import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private router: Router) {}
  @Input()
  public options: any;
  public names = {};
  public buttons: Button1[] = [];

  public ngOnInit() {}
  public nav(nav: string) {
    this.router.navigate([nav]);
  }
}

class Toolbar {
  icon: string | undefined;
  routers!: string;
  name: string | undefined;
}
class Button1 {
  icon: string | undefined;
  routers!: string;
}
