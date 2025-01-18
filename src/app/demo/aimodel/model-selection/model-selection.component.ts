import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MODEL } from 'src/app/constants/model-config.constants';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule,HttpClientModule],
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.scss']
})
export class ModelSelectionComponent implements OnInit {
  models = MODEL; // Models data
  selectedModelIndex: number | null = null; // Holds index of the selected model card
  modelId: string | null = null; // ID of the current model from the route
  currentModelConfig: any = {}; // Holds the current model configuration

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.modelId = this.route.snapshot.paramMap.get('id');
    if (this.modelId) {
      this.loadModelConfig();
    }
  }

  /**
   * Load the model configuration using the API.
   */
  loadModelConfig(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.currentModelConfig = data;
        console.log('Loaded model config:', this.currentModelConfig);
      },
      (error) => {
        console.error('Error loading model config:', error);
        alert('Failed to load model configuration.');
      }
    );
  }

  /**
   * Called when user clicks "Next" or "Submit".
   */
  onSubmitSelection(): void {
    if (this.selectedModelIndex === null) {
      alert('Please select a model before proceeding.');
      return;
    }

    const selectedModel = this.models[this.selectedModelIndex];
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}/model`;

    const payload = {
      model_config: {
        method: selectedModel.modelKey,
        params: selectedModel.parameters
      }
    };

    this.http.patch(apiUrl, payload).subscribe(
      () => {
        alert('Model configuration updated successfully!');
        this.router.navigate(['/model-dashboard', { id: this.modelId }]);
      },
      (error) => {
        console.error('Error updating model config:', error);
        alert('Failed to update model configuration.');
      }
    );
  }

  /**
   * Navigate back to the Labeling component with the current model ID.
   */
  goBack(): void {
    if (this.modelId) {
      this.router.navigate(['/model-dashboard/labeling', this.modelId]);
    } else {
      console.error('Model ID is missing.');
    }
  }
}
