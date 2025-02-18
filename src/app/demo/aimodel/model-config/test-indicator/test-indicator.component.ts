import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-indicator',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule, NgApexchartsModule],
  templateUrl: './test-indicator.component.html',
  styleUrls: ['./test-indicator.component.scss'],
})
export class TestIndicatorComponent implements OnInit {
  @Input() modelId: number | null = null;

  isLoading: boolean = false;
  testResult: any = null;
  errorMessage: string | null = null;
  totalRecords: number | null = null;
  chartOptions: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.modelId) {
      this.runTestIndicator(this.modelId);
    }
  }

  runTestIndicator(modelId: number): void {
    this.isLoading = true;
    this.errorMessage = null;



    const apiUrl = `${environment.apiBaseUrl}/api/model/test_indicator/${modelId}`;
    const payload = {};

    this.http.post(apiUrl, payload).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.testResult = response;
        this.totalRecords = response.total_records;

        if (response.data && response.data.length) {
          this.initializeChart(response.data.slice(0, 300)); // Limit to 300 records
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch test indicator data.';
        console.error('Error fetching test indicator:', error);
      }
    );
  }

  initializeChart(data: any[]): void {
    // Convert epoch time to a readable format for the x-axis
    const timestamps = data.map((item) =>
      new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );

    // Exclude unwanted fields ('close_time' and 'open_time') from the chart series
    const excludedFields = ['time', 'close_time', 'open_time','volume','MACD','PPO','RSI','Signal_Line','Stochastic_D','Stochastic_K','volume','ATR'];
    const series = Object.keys(data[0])
      .filter((key) => !excludedFields.includes(key)) // Exclude unwanted fields
      .map((key) => ({
        name: key,
        data: data.map((item) => item[key] || 0), // Use 0 if the indicator value is missing
      }));

    this.chartOptions = {
      series,
      chart: {
        height: 400,
        type: 'line',
        zoom: {
          enabled: true,
        },
      },
      title: {
        text: 'Indicators Over Time',
        align: 'left',
      },
      xaxis: {
        categories: timestamps, // Use formatted timestamps as the x-axis
        title: {
          text: 'Time',
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
    };
  }
}
