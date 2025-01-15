import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-config',
  imports: [CommonModule, SharedModule],
  templateUrl: './model-config.component.html',
  styleUrls: ['./model-config.component.scss'],
})
export class ModelConfigComponent {
  // Model Info
  modelName: string = '';
  coinSymbol: string = '';

  // Data Selection
  trainingDataOptions = ['Dataset 1', 'Dataset 2', 'Dataset 3']; // Mock data
  testingDataOptions = ['Dataset 1', 'Dataset 2', 'Dataset 3']; // Mock data
  selectedTrainingData: string = '';
  selectedTestingData: string = '';

  // Features with toggle and parameters
  features = [
    {
      name: 'RSI',
      selected: false,
      parameters: { timeperiod: 14 },
    },
    {
      name: 'MACD',
      selected: false,
      parameters: { fastperiod: 12, slowperiod: 26, signalperiod: 9 },
    },
    {
      name: 'Simple Moving Average (SMA)',
      selected: false,
      parameters: { window: 10 },
    },
    {
      name: 'Exponential Moving Average (EMA)',
      selected: false,
      parameters: { span: 10 },
    },
    {
      name: 'Average True Range (ATR)',
      selected: false,
      parameters: { timeperiod: 14 },
    },
    {
      name: 'Stochastic Oscillator',
      selected: false,
      parameters: {
        fastk_period: 5,
        slowk_period: 3,
        slowk_matype: 0,
        slowd_period: 3,
        slowd_matype: 0,
      },
    },
    {
      name: 'Bollinger Band',
      selected: false,
      parameters: { timeperiod: 20, nbdevup: 2, nbdevdn: 2, matype: 0 },
    },
    {
      name: 'Lag Features',
      selected: false,
      parameters: { lag_period: 5 },
    },
    {
      name: 'Percentage Price Oscillator (PPO)',
      selected: false,
      parameters: { fastperiod: 12, slowperiod: 26, matype: 0 },
    },
  ];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/model-dashboard']);
  }

  goNext(): void {
    this.router.navigate(['/model-dashboard/labeling']); // Replace with your next step route
  }
}
