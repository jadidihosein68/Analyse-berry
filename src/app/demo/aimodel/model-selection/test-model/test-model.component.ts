import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApexOptions } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
imports: [CommonModule,  SharedModule, HttpClientModule,NgApexchartsModule],
  styleUrls: ['./test-model.component.scss'],
})

export class TestModelComponent implements OnInit {
  @Input() modelId!: string;
  testModelResult: any = {
    model_metrics: {
      classification_report: {},
    },
    confusion_matrix: [],
  }; // Default structure for testModelResult
  heatmapChartOptions: ApexOptions | null = null; // Chart configuration options
  heatmapSeries: any[] = [];
  isLoading = true; // To handle loading state
  errorMessage: string | null = null; // To handle API errors

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTestModelData();
  }

  loadTestModelData(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model/build/${this.modelId}`;
    this.http.post(apiUrl, {}).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.testModelResult = response?.data || {
          model_metrics: { classification_report: {} },
          confusion_matrix: [],
        }; // Handle empty response gracefully

        this.heatmapChartOptions = this.getHeatmapOptions();
        this.heatmapSeries = this.getHeatmapSeries();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load test model data.';
        console.error('Error fetching test model data:', error);
      }
    );
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getHeatmapOptions(): ApexOptions {
    return {
      chart: { type: 'heatmap', height: 350 },
      dataLabels: { enabled: false },
      colors: ['#008FFB'],
      xaxis: { categories: ['Predicted -1', 'Predicted 0', 'Predicted 1'] },
      yaxis: { labels: { formatter: (val: number) => `Actual ${val}` } },
    };
  }

  getHeatmapSeries(): any[] {
    const confusionMatrix = this.testModelResult?.confusion_matrix || [];
    return [
      { name: '-1', data: confusionMatrix[0] || [] },
      { name: '0', data: confusionMatrix[1] || [] },
      { name: '1', data: confusionMatrix[2] || [] },
    ];
  }
}