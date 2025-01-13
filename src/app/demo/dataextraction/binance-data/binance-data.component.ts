import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-binance-data',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './binance-data.component.html',
  styleUrls: ['./binance-data.component.scss']
})
export class BinanceDataComponent implements OnInit {
  ohlcvData: any[] = [];
  symbols = ['BTCUSDT']; // Dropdown options
  selectedSymbol: string = 'BTCUSDT'; // Default symbol
  interval: number = 5; // Interval in minutes
  limit: number = 100; // Default limit value
  totalRecords: number = 0; // Total records from the API
  currentEpochTime: number = Math.floor(Date.now() / 1000);
  latestRecordEpochTime: number | null = null;
  delta: string = ''; // Delta between times

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOhlcvData();

    // Update the current epoch time and delta dynamically every second
    setInterval(() => {
      this.currentEpochTime = Math.floor(Date.now() / 1000);
      this.calculateDelta();
    }, 1000);
  }

  /**
   * Fetch OHLCV data from the API.
   */
  fetchOhlcvData(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/get_latest_ohlcv`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        const symbolData = response.data.find((item: any) => item.latest_record.symbol === this.selectedSymbol);
        if (symbolData) {
          this.ohlcvData = [symbolData.latest_record];
          this.totalRecords = symbolData.total_records;
          this.latestRecordEpochTime = Math.floor(symbolData.latest_record.close_time / 1000 ); // Convert ms to seconds
          this.calculateDelta();
        } else {
          alert('No data found for the selected symbol.');
          this.ohlcvData = [];
          this.totalRecords = 0;
          this.latestRecordEpochTime = null;
          this.delta = 'No data available';
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data from the API.');
      }
    );
  }

  /**
   * Handle form submission to refetch data.
   */
  onSubmit(): void {
    this.fetchOhlcvData();
  }

  /**
   * Calculate the delta between the current time and the latest record epoch time.
   */
  calculateDelta(): void {
    if (this.latestRecordEpochTime) {
      const deltaSeconds = this.currentEpochTime - this.latestRecordEpochTime;
      const deltaMinutes = Math.floor(deltaSeconds / 60);
      const missedIntervals = Math.floor(deltaMinutes / this.interval);

      this.delta = `${missedIntervals} intervals missed (${deltaMinutes}m remaining)`;
    } else {
      this.delta = 'No latest record time available';
    }
  }
}
