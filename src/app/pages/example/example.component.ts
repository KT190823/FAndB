import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  public href: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.href = this.router.url;
  }
  link() {
    return window.location.href;
  }
  nav = {
    icon: 'menu',
    routers: '/order',
    name: 'Home',
  };
  fab = {
    buttons: [
      {
        icon: 'library_add',
        routers: '/bill',
      },
      {
        icon: 'list',
        routers: '/billlist',
      },
    ],
  };
}
