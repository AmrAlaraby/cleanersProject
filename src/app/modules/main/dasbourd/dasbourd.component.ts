import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MainService } from 'src/app/services/main.service';
import { OrdersDashboardDto } from '../interfaces/interfaces';

@Component({
  selector: 'app-dasbourd',
  templateUrl: './dasbourd.component.html',
  styleUrls: ['./dasbourd.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData!: OrdersDashboardDto;
  isLoading = true;

  revenueChartLabels: string[] = [];
  revenueChartData: ChartDataset[] = [];
  revenueChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => value + ' EGP'
        }
      }
    }
  };

  ordersChartLabels: string[] = [];
  ordersChartData: ChartDataset[] = [];
  ordersChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => value.toString()
        }
      }
    }
  };

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getOrdersDashboard(90).subscribe({
      next: (res) => {
        this.dashboardData = res;
        this.prepareRevenueChart(res.revenuePerDay);
        this.prepareOrdersChart(res.ordersPerDay);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Dashboard API error', err);
        this.isLoading = false;
      }
    });
  }

  prepareRevenueChart(data: { date: string; value: number }[]): void {
    this.revenueChartLabels = data.map(item => item.date);
    this.revenueChartData = [
      {
        data: data.map(item => item.value),
        label: 'الإيرادات اليومية',
        borderColor: '#6f42c1',
        fill: false
      }
    ];
  }

  prepareOrdersChart(data: { date: string; value: number }[]): void {
    this.ordersChartLabels = data.map(item => item.date);
    this.ordersChartData = [
      {
        data: data.map(item => item.value),
        label: 'عدد الطلبات',
        backgroundColor: '#007bff'
      }
    ];
  }
}
