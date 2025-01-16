import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 


@Component({
  selector: 'app-model-config',
  imports: [CommonModule, SharedModule,HttpClientModule],
  templateUrl: './model-config.component.html',
  styleUrls: ['./model-config.component.scss'],
})
export class ModelConfigComponent {
  // Model Info
  modelName: string = '';
  coinSymbol: string = '';

  // Data Selection
  trainingDataOptions = ['Dataset 1', 'Dataset 2', 'Dataset 3']; // Mock data
  selectedTrainingData: string = '';

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
      parameters: { fastk_period: 5, slowk_period: 3, slowk_matype: 0, slowd_period: 3, slowd_matype: 0 },
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

  // Explanations for parameters
  parameterInfo = {
    timeperiod: 'The number of periods to consider for the calculation.',
    fastperiod: 'The fast moving average period.',
    slowperiod: 'The slow moving average period.',
    signalperiod: 'The signal line period.',
    window: 'The rolling window size for calculation.',
    span: 'The span for the exponential moving average.',
    fastk_period: 'The number of periods for the %K line.',
    slowk_period: 'The number of periods for the slow %K line.',
    slowk_matype: 'The moving average type for the slow %K line.',
    slowd_period: 'The number of periods for the %D line.',
    slowd_matype: 'The moving average type for the %D line.',
    nbdevup: 'Number of standard deviations above the mean.',
    nbdevdn: 'Number of standard deviations below the mean.',
    matype: 'The moving average type.',
    lag_period: 'The lag period for the lag features.',
  };

  // State variables
  isEditMode: boolean = false; // Determines if we are editing or creating
  modelId: number | null = null; // ID of the model being edited (null for new model)

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Get parameter explanation.
   * @param paramKey - Parameter key
   */
  getParameterInfo(paramKey: string): string {
    return this.parameterInfo[paramKey] || 'No information available.';
  }

  goBack(): void {
    this.router.navigate(['/model-dashboard']);
  }

  onSubmit(): void {
    const featuresConfig = {
      indicators: this.features
        .filter((feature) => feature.selected)
        .map((feature) => ({
          name: feature.name,
          params: feature.parameters,
        })),
    };

    const trainingDatasetConfig = {
      dataset_type: 'Training',
      enddate: 1735185599999,
      id: 1,
      interval: '5m',
      name_of_dataset: this.selectedTrainingData,
      startdate: 1735184699999,
      symbol: this.coinSymbol,
      total_records: 4,
    };

    const payload = {
      model_name: this.modelName,
      coin_symbol: this.coinSymbol,
      training_dataset_name: this.selectedTrainingData,
      training_dataset_config: trainingDatasetConfig,
      features_config: featuresConfig,
    };

    const apiUrl = this.isEditMode
      ? `${environment.apiBaseUrl}/api/model_config/${this.modelId}`
      : `${environment.apiBaseUrl}/api/model_config`;

    const httpMethod = this.isEditMode ? this.http.put : this.http.post;

    httpMethod
      .call(this.http, apiUrl, payload)
      .subscribe(
        () => {
          alert(this.isEditMode ? 'Model updated successfully!' : 'Model created successfully!');
          this.router.navigate(['/model-dashboard/labeling']); // Navigate to next step
        },
        (error) => {
          console.error('Error submitting model:', error);
          alert('An error occurred while submitting the model.');
        }
      );
  }
}
