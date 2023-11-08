import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../shared/services/order/order.service';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';
import { OrderDetailService } from '../../shared/services/order/order-detail.service';
import { debounceTime, distinctUntilChanged, fromEvent, take } from 'rxjs';
import { TableService } from '../../shared/services/table/table.service';
import { KitchenOrderService } from 'src/app/shared/services/kitchen/kitchen-order.service';
import { SwapTableComponent } from '../dialog/swap-table/swap-table.component';
import { SectionService } from 'src/app/shared/services/table/section.service';
import { DeleteItemComponent } from '../dialog/delete-item/delete-item.component';

import { RoleService } from 'src/app/shared/services/permission/role.service';
import { RolePerService } from 'src/app/shared/services/permission/roleper.service';
import { PrintService } from 'src/app/shared/services/print/print.service';
import { PagesService } from 'src/app/shared/services/pages.service';
import { hubManager } from 'src/app/shared/services/hub-managers/hubManager.service';
import { SettingService } from 'src/app/shared/services/setting/setting.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  form: FormGroup | any = null;
  sub: any[] = [];
  isLoading = true;
  indexProduct = -1;
  table: any = null;
  orderKitchen: any;
  today = new Date().toISOString();
  swapData = {
    tableId: null,
    sectionId: null,
  };
  id = 1;
  permisson: any[] = [];
  reasonDelete: string = '';
  userPermisson: boolean;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private orderManagerService: OrderManagerService,
    private orderDetailService: OrderDetailService,
    private tableSerivce: TableService,
    private kitchenOrderService: KitchenOrderService,
    private ref: ChangeDetectorRef,
    private sectionService: SectionService,
    private roleService: RoleService,
    private roleperService: RolePerService,
    private printService: PrintService,
    private pagesService: PagesService,
    private hubManagerService: hubManager,
    private settingService: SettingService
  ) {
    // this.printer.pick().then((value) => console.log(value));
    // console.log(this.printer.pick(function (192.168.1.11) {}));
  }

  ngOnInit() {
    this.form = this.createForm();
    this.getTableData();
    this.onAddProduct();
  }
  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  createForm() {
    const form = this.formBuilder.group({
      id: [0],
      codeNumber: [''],
      createdAt: [new Date().toISOString()],
      description: [''],
      clientId: [0],
      subTotal: [0],
      discRate: [0, [Validators.max(100), Validators.min(0)]],
      status: [0],
      tip: [0],
      tax: [0, [Validators.max(100), Validators.min(0)]],
      branchCode: [''],
      employeeEmail: [''],
      employeeName: [''],
      isDeleted: false,
      tableItemId: [0],
      paymentMethod: [0],
      orderDetail: this.formBuilder.array([]),
    });

    form.disable();
    form.get('tax')?.enable();
    form.get('discRate')?.enable();

    return form;
  }

  get orderDetails(): FormArray {
    return this.form.controls['orderDetail'] as FormArray;
  }

  createFormDetail() {
    let form = this.formBuilder.group({
      id: [0],
      orderId: [0],
      productName: [''],
      productCode: [''],
      qty: [1],
      price: [0],
      description: [''],
      discount: [null, [Validators.max(100), Validators.min(0)]],
    });

    form.controls['price'].disable();
    form.controls['qty'].disable();
    form.controls['productName'].disable();
    form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((detailValue) => {
        this.formDetailUpdate(form);
      });

    form = this.createFormDetailConfig(form);
    return form;
  }

  createFormDetailConfig(form: FormGroup): FormGroup {
    let description: any = form.get('description') as FormControl;
    let discount: any = form.get('discount') as FormControl;

    discount.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newDiscount: number) => {
        if (Number(newDiscount) > 0 && Number(newDiscount) <= 100) {
          discount.setValue(Number(newDiscount), { emitEvent: false });
        }
      });

    description.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newDescription: string) => {
        description.setValue(newDescription, { emitEvent: false });
      });

    return form;
  }

  totalItem(formDetail: FormGroup | any) {
    let total =
      (formDetail?.get('qty')?.value *
        formDetail?.get('price')?.value *
        (100 - formDetail?.get('discount')?.value)) /
      100;
    return total;
  }
  totalSub() {
    let total = 0;
    for (let i = 0; i < this.orderDetails.controls.length; i++) {
      total += this.totalItem(this.orderDetails.controls[i] as FormGroup);
    }
    return total;
  }

  totalAll() {
    return Math.round(
      this.totalSub() * (1 + this.form?.get('tax').value / 100) -
        this.totalSub() * (this.form?.get('discRate').value / 100)
    );
  }

  getTableData() {
    this.sub.push(
      this.orderManagerService
        .getData()
        .pipe(debounceTime(300))
        .subscribe((orderId) => {
          if (orderId) {
            this.orderService.getOrderById(orderId).subscribe((order) => {
              order.result.orderDetail.forEach((item: any) => {
                this.orderDetails.push(this.createFormDetail());
              });
              this.form.patchValue(order.result);

              this.tableSerivce
                .getStatusById(this.form.get('tableItemId').value)
                .subscribe((table) => {
                  this.table = table.result;
                });

              this.isLoading = false;
            });
          }
        })
    );
  }

  onAddProduct() {
    this.sub.push(
      this.orderManagerService.onAddProduct().subscribe((product) => {
        if (product) {
          const detail = {
            id: 0,
            orderId: this.form.get('id').value,
            productName: product?.itemName,
            productCode: product?.itemCode,
            qty: 1,
            price: product?.unitPrice,
            description: product?.description,
            discount: null,
          };
          this.orderDetailService.postOrder(detail).subscribe((result) => {
            if (result.result.orderId != 0) {
              this.orderDetails.push(this.createFormDetail());
              this.orderDetails
                .at(this.orderDetails.length - 1)
                .patchValue(result.result);
              if (result.result?.price == 0) {
                let price = this.orderDetails
                  .at(this.orderDetails.length - 1)
                  .get('price') as FormControl;

                price.enable();
                price.valueChanges
                  .pipe(debounceTime(500))
                  .subscribe((newPrice: number) => {
                    price.setValue(newPrice, { emitEvent: false });
                  });
              }
              this.orderManagerService.addProduct(null);
              this.isLoading = false;
            } else {
              this.orderDetailService.deleteOrder(result.result.id).subscribe();
            }
          });
        }
      })
    );
  }

  onAddProductOutside() {
    //create item
    let newItem = this.createFormDetail();

    //setting item
    newItem.get('orderId')?.setValue(this.form.get('id').value);
    newItem.controls['qty'].enable();
    newItem.controls['productName'].enable();
    newItem.controls['price'].enable();
    let productName: any = newItem.get('productName') as FormControl;
    let price: any = newItem.get('price') as FormControl;
    price.valueChanges.pipe(debounceTime(500)).subscribe((newPrice: number) => {
      price.setValue(Number(newPrice), { emitEvent: false });
    });
    productName.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newProductName: string) => {
        productName.setValue(newProductName, { emitEvent: false });
      });

    //add order detail
    this.orderDetailService
      .postOrder(newItem.getRawValue())
      .subscribe((item) => {
        newItem.patchValue(item.result);
        this.orderDetails.push(newItem);
      });
  }

  openSwapTable(): void {
    const dialogRef = this.dialog.open(SwapTableComponent, {
      data: {
        tableId: this.table.id,
        sectionId: this.table.tableSectionId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.tableId != this.table.id) {
          this.isLoading = true;
          this.tableSerivce.getStatusById(result.tableId).subscribe((table) => {
            //check table
            if (table.result) {
              this.table = table.result;
              //update order
              this.form.get('status').setValue(90);
              this.orderService
                .updateOrder(this.form.getRawValue())
                .subscribe(() => {
                  //table has order
                  if (table.result.order) {
                    if (this.form.get('id').value != table.result?.order?.id) {
                      this.orderDetails.controls.forEach((orderDetail) => {
                        orderDetail
                          .get('orderId')
                          ?.setValue(table.result?.order?.id);
                      });
                      this.orderDetailService
                        .updateBatch(this.orderDetails.getRawValue())
                        .subscribe(() => {
                          this.orderService
                            .getOrderById(table.result?.order?.id)
                            .subscribe((order) => {
                              this.form.reset();
                              this.orderDetails.clear();
                              order?.result?.orderDetail.forEach((item) => {
                                this.orderDetails.push(this.createFormDetail());
                              });
                              this.form.patchValue(order?.result);
                              this.orderManagerService.sendTable(this.table);
                              this.isLoading = false;
                            });
                        });
                    }
                  }
                  // table dont have order
                  else {
                    this.form.get('id').setValue(0);
                    this.form.get('status').setValue(10);
                    this.form.get('tableItemId').setValue(table?.result?.id);
                    this.orderService
                      .postOrder(this.form.getRawValue())
                      .subscribe((newOrder) => {
                        this.orderDetails.controls.forEach((orderDetail) => {
                          orderDetail
                            .get('orderId')
                            ?.setValue(newOrder?.result?.id);
                        });
                        this.orderDetailService
                          .updateBatch(this.orderDetails.getRawValue())
                          .subscribe((orderDetails) => {
                            this.form.reset();
                            this.form.patchValue(newOrder.result);
                            this.orderDetails.patchValue(orderDetails.result);
                            this.orderManagerService.sendTable(this.table);
                            this.isLoading = false;
                          });
                      });
                  }
                });
            } else {
              this.isLoading = false;
            }
          });
        }
      }
    });
  }

  openDeleteItem(itemId: number, index: number): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { itemId: itemId, reason: this.reasonDelete },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.deleteItemWithReason(result.itemId, index, result.reason);
      }
    });
  }

  goPayment(id?: number) {
    this.form.controls['subTotal'].setValue(this.totalSub());
    this.orderService.updateOrder(this.form.getRawValue()).subscribe((data) => {
      this.router.navigate([`pages/payment/${id}`]);
      this.pagesService.sendData('');
    });
  }
  btn_SendOrder(id?: number) {
    this.form.controls['subTotal'].setValue(this.totalSub());
    this.orderService.updateOrder(this.form.getRawValue()).subscribe((data) => {
      this.orderManagerService.sendTable(this.table);
      this.pagesService.sendData('');
    });
  }
  goFind() {
    this.router.navigate([
      `pages/find`,
      { tableSectionId: this.table.tableSectionId },
    ]);
    this.pagesService.sendData('');
  }

  btn_minus(foodId: number, index: number) {
    this.indexProduct = index;
    let newQty = this.orderDetails.controls[index].get('qty')?.value - 1;
    if (newQty == 0) {
      this.indexProduct = -1;
      this.openDeleteItem(foodId, index);
    } else {
      this.orderDetails.controls[index]
        .get('qty')
        ?.setValue(this.orderDetails.controls[index].get('qty')?.value - 1);
    }
  }
  btn_plus(foodId: number, index: number) {
    this.indexProduct = index;
    this.orderDetails.controls[index]
      .get('qty')
      ?.setValue(this.orderDetails.controls[index].get('qty')?.value + 1);
    let qty = this.orderDetails.controls[index].get('qty')?.value;
  }

  printInvoice() {
    this.settingService.getByKey('printerInvoice').subscribe((data) => {
      let printerName: any = data.result[0]?.value;
      let printSection = document.getElementById('invoice-print');
      //get width height body deitals
      let widthBodyDetails =
        document.getElementById('body-detail-invoice')?.clientWidth! * 0.24;
      let heightBodyDetails = document.getElementById('body-detail-invoice')
        ?.clientHeight!;
      //open print

      this.hubManagerService.initConnect(() => {
        this.printService.addQueue({
          printerName,
          template: printSection?.outerHTML,
          heightBodyDetails,
        });
        this.printService.print();
      });
    });
  }

  printProcess() {
    this.kitchenOrderService
      .getDefaultKitchenOrderByOrderId(this.form.get('id').value)
      .subscribe((order) => {
        if (order.result.length > 0) {
          this.settingService
            .getStartByKey('print')
            .subscribe((printers: any) => {
              this.hubManagerService?.initConnect(() => {
                order.result.forEach((element) => {
                  if (element.details.length > 0) {
                    this.kitchenOrderService.createItem(element).subscribe();
                    this.orderKitchen = element.details;
                    this.ref.detectChanges();

                    //get width height body deitals
                    let widthBodyDetails =
                      document.getElementById('body-detail-invoice')
                        ?.clientWidth! * 0.24;
                    let heightBodyDetails = document.getElementById(
                      'body-detail-invoice'
                    )?.clientHeight!;
                    //open print
                    let printSection = document.getElementById('process-print');

                    this.printService.addQueue({
                      printerName: printers.result.filter((x) =>
                        x.key
                          .toLowerCase()
                          .includes(element.description.toLowerCase())
                      )[0]?.value,
                      template: printSection?.outerHTML,
                      heightBodyDetails,
                    });
                  }
                  this.printService.print();
                });
              });
            });
        } else {
          alert('Không có chế biến mới');
        }
      });
  }

  formDetailUpdate(formDetail: FormGroup) {
    this.orderDetailService
      .updateOrder(formDetail.getRawValue())
      .subscribe(() => {
        this.totalItem(formDetail);
      });
  }

  deleteItem(itemId: number, index: number) {
    this.orderDetailService.deleteOrder(itemId).subscribe(() => {
      this.orderDetails.removeAt(index);
      this.totalItem(this.orderDetails.controls[index] as FormGroup);
    });
  }

  deleteItemWithReason(itemId: number, index: number, reason: string) {
    this.orderDetailService.deleteWithReason(itemId, reason).subscribe(() => {
      this.orderDetails.removeAt(index);
      this.totalItem(this.orderDetails.controls[index] as FormGroup);
    });
  }

  canAccess(namePermission: string) {
    return this.roleperService.canCurrentUser(namePermission);
  }

  close() {
    this.pagesService.sendData('');
  }
}
