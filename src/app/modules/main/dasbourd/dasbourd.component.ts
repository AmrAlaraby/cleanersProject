import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dasbourd',
  templateUrl: './dasbourd.component.html',
  styleUrls: ['./dasbourd.component.css']
})
export class DashboardComponent implements OnInit {
  // Line chart data
  chartLabels: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  totalInvoicesData: ChartDataset[] = [{ data: [1, 2, 1, 3, 2, 4, 3], label: 'Total Invoices', borderColor: '#ccc', fill: false }];
  paidInvoicesData: ChartDataset[] = [{ data: [2, 3, 2, 4, 3, 5, 4], label: 'Paid Invoices', borderColor: '#28a745', fill: false }];
  unpaidInvoicesData: ChartDataset[] = [{ data: [3, 2, 4, 1, 3, 2, 1], label: 'Unpaid Invoices', borderColor: '#dc3545', fill: false }];
  invoicesSentData: ChartDataset[] = [{ data: [1, 3, 2, 4, 2, 3, 1], label: 'Invoices Sent', borderColor: '#fd7e14', fill: false }];
  lineChartOptions: ChartOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } };

  // Bar chart data
  barChartLabels: string[] = ['Sunday', 'Monday', 'Tuesday'];
  barChartData: ChartDataset[] = [
    { data: [60, 70, 50], label: 'Series 1', backgroundColor: '#dc3545' },
    { data: [50, 80, 40], label: 'Series 2', backgroundColor: '#6f42c1' },
    { data: [70, 60, 70], label: 'Series 3', backgroundColor: '#fd7e14' }
  ];
  barChartOptions: ChartOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { y: { display: false } } };

  // Revenue chart data
  revenueChartLabels: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  revenueChartData: ChartDataset[] = [{ data: [20, 30, 25, 40, 35, 50, 45], label: 'Revenue', borderColor: '#6f42c1', fill: false }];
  revenueChartOptions: ChartOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: (value) => value + 'K' } } } };

  ngOnInit() {}
}