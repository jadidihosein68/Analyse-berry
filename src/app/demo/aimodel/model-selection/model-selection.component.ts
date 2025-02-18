import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MODEL } from 'src/app/constants/model-config.constants';
import { HttpClientModule } from '@angular/common/http';
import { TestModelComponent } from './test-model/test-model.component'; // Import the TestModelComponent

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, HttpClientModule,TestModelComponent],
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.scss'],
})
export class ModelSelectionComponent implements OnInit {
  models = MODEL; // Models data
  selectedModelIndex: number | null = null; // Holds index of the selected model card
  modelId: string | null = null; // ID of the current model from the route
  currentModelConfig: any = {}; // Holds the current model configuration
  isTestModelVisible: boolean = false; // Toggles visibility of TestModelComponent

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

  loadModelConfig(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.currentModelConfig = data;

        // Determine the selected model index
        const method = data.model_config?.method || 'RandomForestClassifier';
        this.selectedModelIndex = this.models.findIndex(
          (model) => model.modelKey === method
        );

        // Default to "RandomForestClassifier" if no match found
        if (this.selectedModelIndex === -1) {
          this.selectedModelIndex = this.models.findIndex(
            (model) => model.modelKey === 'RandomForestClassifier'
          );
        }
      },
      (error) => {
        console.error('Error loading model config:', error);
        alert('Failed to load model configuration.');
      }
    );
  }

  onSubmitSelection(): void {
    if (this.selectedModelIndex === null) {
      alert('Please select a model before proceeding.');
      return;
    }

    const selectedModel = this.models[this.selectedModelIndex];
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}/model`;

    const params = selectedModel.parameters.map((param: any) => ({
      [param.name]: param.userValue || param.defaultValue,
    }));

    const payload = {
      model_config: {
        method: selectedModel.modelKey,
        params,
      },
    };

    this.http.patch(apiUrl, payload).subscribe(
      () => {
        alert('Model configuration updated successfully!');
        this.router.navigate(['/model-dashboard/model-confirmation', this.modelId]);
      },
      (error) => {
        console.error('Error updating model config:', error);
        alert('Failed to update model configuration.');
      }
    );
  }

  goBack(): void {
    if (this.modelId) {
      this.router.navigate(['/model-dashboard/labeling', this.modelId]);
    } else {
      console.error('Model ID is missing.');
    }
  }

  showTestModel(): void {
    this.isTestModelVisible = true;
  }

  closeTestModel(): void {
    this.isTestModelVisible = false;
  }
}
