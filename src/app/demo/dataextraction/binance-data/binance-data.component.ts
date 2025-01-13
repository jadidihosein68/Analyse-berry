// Import necessary Angular modules and libraries
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-binance-data',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './binance-data.component.html',
  styleUrls: ['./binance-data.component.scss']
})
export class BinanceDataComponent implements OnInit {
  ohlcvData: any[] = [];
  symbol: string = 'BTCUSDT';
  interval: string = '1m';
  limit: number = 100;
  currentEpochTime: number = Math.floor(Date.now() / 1000);
  latestRecordEpochTime: number = 1672531200; // Hardcoded value for now
  delta: string = ''; // To store the delta between times

  constructor() {}

  ngOnInit(): void {
    // Calculate delta on initialization
    this.calculateDelta();
    // Fetch initial data
    this.fetchOhlcvData();

    // Update the current epoch time and delta dynamically every second
    setInterval(() => {
      this.currentEpochTime = Math.floor(Date.now() / 1000);
      this.calculateDelta();
    }, 1000);
  }

  fetchOhlcvData(): void {
    // Simulated API response for now
    const hardcodedResponse = [
      { time: 1672531200, open: 50000, high: 51000, low: 49500, close: 50500, volume: 1000 },
      { time: 1672531260, open: 50500, high: 51500, low: 50000, close: 51000, volume: 1500 }
    ];
    
    // Assign the response to the OHLCV data
    this.ohlcvData = hardcodedResponse;

    // Update the latest record epoch time based on the response
    if (this.ohlcvData.length > 0) {
      this.latestRecordEpochTime = this.ohlcvData[this.ohlcvData.length - 1].time;
    }

    // Recalculate delta after fetching data
    this.calculateDelta();
  }

  onSubmit(): void {
    // Re-fetch data on form submission
    this.fetchOhlcvData();
  }

  calculateDelta(): void {
    if (this.latestRecordEpochTime) {
      const deltaSeconds = this.currentEpochTime - this.latestRecordEpochTime;
      const deltaMinutes = Math.floor(deltaSeconds / 60);
      const remainingSeconds = deltaSeconds % 60;

      // Format delta with a warning if it exceeds 5 minutes
      if (deltaMinutes >= 5) {
        this.delta = `⚠️ Delta exceeds 5 minutes: ${deltaMinutes}m ${remainingSeconds}s`;
      } else {
        this.delta = `✅ Delta: ${deltaMinutes}m ${remainingSeconds}s`;
      }
    } else {
      this.delta = 'No latest record time available';
    }
  }
}
