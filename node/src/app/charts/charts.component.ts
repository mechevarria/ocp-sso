import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Color } from 'ng2-charts/charts/charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {
  colors: Color[];

  doughnutChartLabels: string[];
  doughnutChartData: number[];
  doughnutChartType: string;

  barChartOptions: any;
  barChartLabels: string[];
  barChartType: string;
  barChartLegend: boolean;
  barChartData: any[];

  constructor(private messageService: MessageService) {
    // colors pulled from https://coreui.io/docs/getting-started/ui-kit/
    this.colors = [{ backgroundColor: ['#f86c6b', '#20a8d8', '#ffc107', '#4dbd74', '#a4b7c1', '#63c2de', '#29363d'] }];

    this.doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    this.doughnutChartData = [350, 450, 100];
    this.doughnutChartType = 'doughnut';

    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.messageService.success('Successfully loaded charts view');
  }

  ngOnInit() {}
}
