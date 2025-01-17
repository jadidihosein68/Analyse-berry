import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FEATURES, STRATEGIES } from 'src/app/constants/model-config.constants';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-labeling',
  standalone: true,
  imports: [CommonModule, SharedModule,HttpClientModule],
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.scss'],
})
export class LabelingComponent implements OnInit {
  selectedStrategy: string = 'Default strategy';
  strategies = STRATEGIES; // Imported from constants
  features = FEATURES; // Imported from constants

  modelId: string | null = null;
  modelName: string = '';
  coinSymbol: string = '';
  selectedTrainingData: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.modelId = this.route.snapshot.paramMap.get('id');
    if (this.modelId) {
      this.loadModelData();
    }
  }

  loadModelData(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.modelName = data.model_name;
        this.coinSymbol = data.coin_symbol;
        this.selectedTrainingData = data.training_dataset_name;

        this.features.forEach((feature) => {
          const matchedIndicator = data.features_config?.indicators?.find(
            (indicator: any) => indicator.name === feature.name
          );
          if (matchedIndicator) {
            feature.selected = true;
            feature.parameters = matchedIndicator.params || feature.parameters;
          }
        });

        this.selectedStrategy =
          data.label_config?.type === 'majority'
            ? 'Signal from majority'
            : 'Default strategy';
      },
      (error) => {
        console.error('Error loading model data:', error);
        alert('Failed to load model data.');
      }
    );
  }

  goNext(): void {
    if (this.modelId) {
      const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
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
        label_config: {
          type:
            this.selectedStrategy === 'Default strategy'
              ? 'default'
              : 'majority',
        },
      };

      this.http.put(apiUrl, payload).subscribe(
        () => {
          this.router.navigate(['/model-dashboard/model-selection', this.modelId]);
        },
        (error) => {
          console.error('Error updating model config:', error);
          alert('Failed to update model config.');
        }
      );
    } else {
      console.error('Model ID is missing.');
    }
  }

  goBack(): void {
    if (this.modelId) {
      this.router.navigate(['/model-dashboard/model-config', { id: this.modelId }]);
    } else {
      console.error('Model ID is missing.');
    }
  }
}
