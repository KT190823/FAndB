import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../shared/services/dashboard/dashboard.service';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selected = 'option1';
  // startDay = moment().subtract(7, 'days').calendar();
  startDay = moment().format('YYYY-MM-DDT00:00:00');
  endDay = moment().format('YYYY-MM-DDTHH:mm:ss');
  tenantId = 0;
  sheet1: any;
  sheet2: any;
  sheet3: any;
  sheet4: any;
  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.sheet1 = this.Sheet1();
    this.getValue(this.startDay, this.endDay, this.tenantId);
  }
  ChangeValue(event: any) {
    switch (Number(event.value)) {
      case 1:
        this.startDay = moment().format('YYYY-MM-DDT00:00:00');
        this.endDay = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.getValue(this.startDay, this.endDay, this.tenantId);
        break;
      case 2:
        let dayofweek = moment().format('E');
        this.startDay = moment()
          .subtract(dayofweek, 'days')
          .format('YYYY-MM-DDT00:00:00');
        this.endDay = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.getValue(this.startDay, this.endDay, this.tenantId);
        break;
      case 3:
        let dayofweek3 = moment().format('E');
        this.startDay = moment()
          .subtract(1, 'week')
          .subtract(dayofweek3, 'days')
          .add(1, 'days')
          .format('YYYY-MM-DDT00:00:00');
        this.endDay = moment()
          .subtract(dayofweek3, 'days')
          .format('YYYY-MM-DDT23:59:59');
        this.getValue(this.startDay, this.endDay, this.tenantId);
        break;
      case 4:
        let dayofweek4 = moment().format('DD');
        this.startDay = moment()
          .subtract(dayofweek4, 'days')
          .add(1, 'days')
          .format('YYYY-MM-DDT00:00:00');
        this.endDay = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.getValue(this.startDay, this.endDay, this.tenantId);
        break;
      case 5:
        let dayofweek5 = moment().format('DD');
        this.startDay = moment()
          .subtract(1, 'month')
          .subtract(dayofweek5, 'days')
          .add(1, 'days')
          .format('YYYY-MM-DDT00:00:00');
        this.endDay = moment()
          .subtract(dayofweek5, 'days')
          .format('YYYY-MM-DDT23:59:59');
        this.getValue(this.startDay, this.endDay, this.tenantId);
        break;
      default:
        this.startDay = moment().format('YYYY-MM-DDT00:00:00');
        this.endDay = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.getValue(this.startDay, this.endDay, this.tenantId);
        break;
    }
  }
  getValue(fromDate: string, toDate: string, tenantId: number) {
    this.dashboardService
      .postSheet1(fromDate, toDate, tenantId)
      .subscribe((data: any) => {
        this.sheet1 = data.result;
      });
    this.dashboardService.postSheet2().subscribe((data: any) => {
      this.sheet2 = data.result;
      this.createSheet2();
    });
    this.dashboardService
      .getTop10OrderDetail(moment().format('YYYY-MM-DD'))
      .subscribe((data: any) => {
        this.sheet3 = data.result;
        console.log(this.sheet3);
        this.createSheet3();
      });
    this.dashboardService
      .getTop5Category(moment().format('YYYY-MM-DD'))
      .subscribe((data: any) => {
        this.sheet4 = data.result;
        this.createSheet4();
      });
  }

  createSheet2() {
    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          moment(this.sheet2[5]?.date).format('DD/MM'),
          moment(this.sheet2[4]?.date).format('DD/MM'),
          moment(this.sheet2[3]?.date).format('DD/MM'),
          moment(this.sheet2[2]?.date).format('DD/MM'),
          moment(this.sheet2[1]?.date).format('DD/MM'),
          moment(this.sheet2[0]?.date).format('DD/MM'),
        ],
        datasets: [
          {
            label: 'Cột',
            data: [
              this.sheet2[5]?.revenue,
              this.sheet2[4]?.revenue,
              this.sheet2[3]?.revenue,
              this.sheet2[2]?.revenue,
              this.sheet2[1]?.revenue,
              this.sheet2[0]?.revenue,
            ],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
            order: 1,
          },
          {
            label: 'Đường',
            data: [
              this.sheet2[5]?.revenue,
              this.sheet2[4]?.revenue,
              this.sheet2[3]?.revenue,
              this.sheet2[2]?.revenue,
              this.sheet2[1]?.revenue,
              this.sheet2[0]?.revenue,
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            type: 'line',
            order: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createSheet3() {
    var myChart2 = new Chart('myChart2', {
      type: 'bar',
      data: {
        labels: [
          this.sheet3[0]?.productName,
          this.sheet3[1]?.productName,
          this.sheet3[2]?.productName,
          this.sheet3[3]?.productName,
          this.sheet3[4]?.productName,
          this.sheet3[5]?.productName,
          this.sheet3[6]?.productName,
          this.sheet3[7]?.productName,
          this.sheet3[8]?.productName,
          this.sheet3[9]?.productName,
        ],
        datasets: [
          {
            label: 'Cột',
            data: [
              this.sheet3[0]?.amount,
              this.sheet3[1]?.amount,
              this.sheet3[2]?.amount,
              this.sheet3[3]?.amount,
              this.sheet3[4]?.amount,
              this.sheet3[5]?.amount,
              this.sheet3[6]?.amount,
              this.sheet3[7]?.amount,
              this.sheet3[8]?.amount,
              this.sheet3[9]?.amount,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#F5C492',
              '#7DA665',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
  createSheet4() {
    var myChart3 = new Chart('myChart3', {
      type: 'doughnut',
      data: {
        labels: [
          this.sheet4[0]?.categoryName,
          this.sheet4[1]?.categoryName,
          this.sheet4[2]?.categoryName,
          this.sheet4[3]?.categoryName,
          this.sheet4[4]?.categoryName,
        ],
        datasets: [
          {
            label: 'số lượng',
            data: [
              this.sheet4[0]?.totalCount,
              this.sheet4[1]?.totalCount,
              this.sheet4[2]?.totalCount,
              this.sheet4[3]?.totalCount,
              this.sheet4[4]?.totalCount,
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#F5C492',
              '#7DA665',
            ],
            hoverOffset: 8,
          },
        ],
      },
    });
  }

  Sheet1() {
    let form = this.formBuilder.group({
      revenue: 0,
      totalDiscount: 0,
      invoiceSummary: {
        count: 0,
        average: 0,
      },
      currentTableInfo: {
        total: 0,
        inUse: 0,
        subTotal: 0,
      },
    });
    return form;
  }
}
