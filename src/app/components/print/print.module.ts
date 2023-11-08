import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print.component';
import { PrintRoutingModule } from './print-routing.module';
import { PrintPageComponent } from './print-page/print-page.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

@NgModule({
  declarations: [PrintComponent, PrintPageComponent, PrintInvoiceComponent],
  imports: [
    CommonModule,
    PrintRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
})
export class PrintModule {}
