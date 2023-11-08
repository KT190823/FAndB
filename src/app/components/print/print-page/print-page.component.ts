import { Component } from '@angular/core';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
})
export class PrintPageComponent {
  printElement(id: any) {
    var printHtml = document.getElementById(id)!.outerHTML;
    var currentPage = document.body.innerHTML;
    var elementPage =
      '<html><head><title></title></head><body>' + printHtml + '</body>';
    //change the body
    document.body.innerHTML = elementPage;
    //print
    window.print();
    //go back to the original
    document.body.innerHTML = currentPage;
  }
}
