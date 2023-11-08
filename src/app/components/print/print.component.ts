import { Component, OnInit } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent implements OnInit {
  order: any;
  editor: any;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderById(1217).subscribe((order) => {
      this.order = order.result;
      FroalaEditor.DefineIcon('insertHTML', { NAME: 'plus', SVG_KEY: 'add' });
      FroalaEditor.RegisterCommand('insertHTML', {
        title: 'Insert HTML',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          this.html.insert('Some Custom HTML.');
          this.undo.saveStep();
        },
      });

      this.editor = new FroalaEditor('div#froala-editor', {
        toolbarButtons: [
          [
            'bold',
            'italic',
            'underline',
            'paragraphFormat',
            'formatOL',
            'formatUL',
          ],
          ['insertHTML', 'undo', 'redo', 'html'],
        ],
        pluginsEnabled: ['image', 'link', 'draggable', 'emoticons'],
      });

      console.log(this.editor?._original_html);
    });
  }
}
