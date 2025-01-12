// Import necessary Angular modules and libraries
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@Component({
  selector: 'app-binance-data',
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
  
  constructor() {}

  ngOnInit(): void {
    this.fetchOhlcvData();
  }

  fetchOhlcvData(): void {
    // Hardcoded API response for now
    const hardcodedResponse = [
      { time: 1672531200, open: 50000, high: 51000, low: 49500, close: 50500, volume: 1000 },
      { time: 1672531260, open: 50500, high: 51500, low: 50000, close: 51000, volume: 1500 }
    ];
    
    this.ohlcvData = hardcodedResponse;
  }

  onSubmit(): void {
    this.fetchOhlcvData();
  }
}
