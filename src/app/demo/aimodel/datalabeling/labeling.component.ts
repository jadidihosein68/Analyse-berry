import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { STRATEGIES } from 'src/app/constants/model-config.constants';



@Component({
  selector: 'app-labeling',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.scss'],
})
export class LabelingComponent implements OnInit {
  selectedStrategy: string = ''; // User-selected strategy
  selectedStrategyParams: Record<string, any> = {}; // Editable parameters for the selected strategy

  strategies = STRATEGIES;

  modelId: string | null = null; // Model ID from the route
  testLabelingResult: any = null;
  

  labelMapping: Record<string, string> = {
    '1': 'BUY_SIGNAL',
    '-1': 'SELL_SIGNAL',
    '0': 'HOLD_SIGNAL',
  };
  labelDistributionKeys: string[] = [];

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

  /**
   * Load model data to pre-select the strategy and its parameters
   */
  loadModelData(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        const selectedStrategy = this.strategies.find(
          (strategy) => strategy.name === data.label_config?.method
        );
        this.selectedStrategy = selectedStrategy ? selectedStrategy.name : '';
        this.selectedStrategyParams = selectedStrategy
          ? { ...selectedStrategy.parameters }
          : {};
      },
      (error) => {
        console.error('Error loading model data:', error);
        alert('Failed to load model data.');
      }
    );
  }

  /**
   * Handle strategy change
   */
  onStrategyChange(strategy: any): void {
    this.selectedStrategyParams = { ...strategy.parameters };
  }

  /**
   * Helper method to check if a value is an array
   */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Add a new item to an array parameter
   */
  addArrayItem(paramKey: string): void {
    if (!Array.isArray(this.selectedStrategyParams[paramKey])) {
      this.selectedStrategyParams[paramKey] = [];
    }
    // Add an empty item (could be '' or any default)
    this.selectedStrategyParams[paramKey].push('');
  }

  /**
   * Remove an item from an array parameter at the given index
   */
  removeArrayItem(paramKey: string, index: number): void {
    if (Array.isArray(this.selectedStrategyParams[paramKey])) {
      this.selectedStrategyParams[paramKey].splice(index, 1);
    }
  }

  /**
   * Update label_config and navigate to the Model Selection component
   */
  goNext(): void {
    if (this.modelId) {
      const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}/label`;

      const payload = {
        label_config: {
          method: this.selectedStrategy,
          params: this.selectedStrategyParams,
        },
      };

      this.http.patch(apiUrl, payload).subscribe(
        () => {
          this.router.navigate(['/model-dashboard/model-selection', this.modelId]);
        },
        (error) => {
          console.error('Error updating label config:', error);
          alert('Failed to update label config.');
        }
      );
    } else {
      console.error('Model ID is missing.');
    }
  }

  /**
   * Navigate back to Model Config
   */
  goBack(): void {
    if (this.modelId) {
      this.router.navigate(['/model-dashboard/model-config', { id: this.modelId }]);
    } else {
      console.error('Model ID is missing.');
    }
  }


  testLabeling(): void {
    if (this.modelId) {
      const apiUrl = `http://localhost:5000/api/model/test_labeling/${this.modelId}`;
      this.http.post(apiUrl, {}).subscribe(
        (response: any) => {
          this.testLabelingResult = response;
          this.labelDistributionKeys = Object.keys(response.label_distribution);
        },
        (error) => {
          console.error('Error testing labeling:', error);
          alert('Failed to perform labeling test.');
        }
      );
    } else {
      alert('Model ID is not available.');
    }
  }



}
