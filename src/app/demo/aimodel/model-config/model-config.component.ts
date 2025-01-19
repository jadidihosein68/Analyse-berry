import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FEATURES } from 'src/app/constants/model-config.constants';

@Component({
  selector: 'app-model-config',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './model-config.component.html',
  styleUrls: ['./model-config.component.scss'],
})
export class ModelConfigComponent implements OnInit {
  // Model Info
  modelName: string = '';
  coinSymbol: string = '';

  // Data Selection
  trainingDataOptions: any[] = []; // Array to hold dataset options
  selectedTrainingData: string = '';
  trainingDatasetConfig: any = {}; // Stores the selected dataset configuration

  // Features with toggle and parameters
  features = FEATURES.map((feature) => ({
    ...feature,
    selected: false,
    parameters: { ...feature.parameters },
  }));

  // Parameter Explanations
  parameterInfo: { [key: string]: string } = {
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

  isEditMode: boolean = false; // Determines if we're editing
  modelId: number | null = null; // ID for edit mode

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.modelId = +params['id'];
        this.resetState(); // Reset state before loading data
        this.loadModelData();
      }
    });

    // Load training dataset options from the API
    this.loadTrainingDataOptions();
  }

  /**
   * Reset component state before loading new data
   */
  private resetState(): void {
    this.modelName = '';
    this.coinSymbol = '';
    this.selectedTrainingData = '';
    this.trainingDatasetConfig = {};
    this.features = FEATURES.map((feature) => ({
      ...feature,
      selected: false,
      parameters: { ...feature.parameters },
    }));
  }

  /**
   * Load training dataset options from the API
   */
  loadTrainingDataOptions(): void {
    const apiUrl = 'http://127.0.0.1:5000/api/data_collections';
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.trainingDataOptions = data.map((dataset) => ({
          name: dataset.name_of_dataset,
          config: dataset,
        }));
      },
      (error) => {
        console.error('Error loading training data options:', error);
        alert('Failed to load training data options.');
      }
    );
  }

  /**
   * Update training dataset configuration when a new dataset is selected
   */
  onTrainingDataChange(): void {
    const selectedOption = this.trainingDataOptions.find(
      (option) => option.name === this.selectedTrainingData
    );
    if (selectedOption) {
      this.trainingDatasetConfig = selectedOption.config;
    }
  }

  /**
   * Load model data from the API
   */
  loadModelData(): void {
    const url = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.modelName = data.model_name;
        this.coinSymbol = data.coin_symbol;
        this.selectedTrainingData = data.training_dataset_name;
        this.trainingDatasetConfig = data.training_dataset_config || {};

        this.features.forEach((feature) => {
          const matchedFeature = data.features_config.indicators.find(
            (f: any) => f.name === feature.name
          );
          if (matchedFeature) {
            feature.selected = true;
            feature.parameters = { ...feature.parameters, ...matchedFeature.params };
          }
        });

        // Force change detection to refresh UI
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error loading model data:', error);
      }
    );
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    const featuresConfig = {
      indicators: this.features
        .filter((feature) => feature.selected)
        .map((feature) => ({
          name: feature.name,
          params: feature.parameters,
        })),
    };

    const payload = {
      model_name: this.modelName,
      coin_symbol: this.coinSymbol,
      training_dataset_name: this.selectedTrainingData,
      training_dataset_config: this.trainingDatasetConfig,
      features_config: featuresConfig,
    };

    const apiUrl = this.isEditMode
      ? `${environment.apiBaseUrl}/api/model_config/${this.modelId}`
      : `${environment.apiBaseUrl}/api/model_config`;

    const httpMethod = this.isEditMode ? this.http.put : this.http.post;

    httpMethod.call(this.http, apiUrl, payload).subscribe(
      (response: any) => {
        if (!this.isEditMode) {
          this.modelId = response?.id; // Ensure backend includes generated ID
        }

        if (this.modelId) {
          this.router.navigate(['/model-dashboard/labeling', this.modelId]);
        } else {
          console.error('Model ID is missing. Navigation aborted.');
        }
      },
      (error) => {
        console.error('Error submitting model:', error);
        alert('An error occurred while submitting the model.');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/model-dashboard']);
  }

  getParameterInfo(paramKey: string): string {
    return this.parameterInfo[paramKey] || 'No information available.';
  }
}
