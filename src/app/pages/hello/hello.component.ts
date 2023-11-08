import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent {
  constructor(private router: Router) {
  }

  nav(){
    this.router.navigate([`/menu`]);
  }

}
