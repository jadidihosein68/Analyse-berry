import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApexOptions } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
imports: [CommonModule,  SharedModule, HttpClientModule,NgApexchartsModule],
  styleUrls: ['./test-model.component.scss'],
})

export class TestModelComponent implements OnInit {
    @Input() modelId!: string;
    testModelResult: any = null;
    heatmapChartOptions: any;
    heatmapSeries: any;
  
    ngOnInit(): void {
      // Initialize API call or mock data for testing
      this.loadTestModelData();
    }
  
    loadTestModelData() {
      // Simulated API response
      this.testModelResult = {
        model_metrics: {
          classification_report: {
            '-1': { precision: 0.8, recall: 0.9, 'f1-score': 0.85 },
            '0': { precision: 0.95, recall: 0.98, 'f1-score': 0.96 },
            '1': { precision: 0.7, recall: 0.8, 'f1-score': 0.75 },
          },
        },
      };
  
      this.heatmapChartOptions = this.getHeatmapOptions();
      this.heatmapSeries = this.getHeatmapSeries();
    }
  
    objectKeys(obj: any): string[] {
      return Object.keys(obj);
    }
  
    getHeatmapOptions() {
      return {
        chart: { type: 'heatmap', height: 350 },
        dataLabels: { enabled: false },
        colors: ['#008FFB'],
        xaxis: { categories: ['Predicted -1', 'Predicted 0', 'Predicted 1'] },
        yaxis: { labels: { formatter: (val: number) => `Actual ${val}` } },
      };
    }
  
    getHeatmapSeries() {
      return [
        { name: 'Actual -1', data: [9, 3, 0] },
        { name: 'Actual 0', data: [0, 174, 0] },
        { name: 'Actual 1', data: [0, 1, 2] },
      ];
    }
  }