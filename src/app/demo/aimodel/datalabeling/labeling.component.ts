import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { STRATEGIES } from 'src/app/constants/model-config.constants';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-labeling',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.scss'],
})
export class LabelingComponent implements OnInit {
  selectedStrategy: string = 'Default strategy';
  strategies = STRATEGIES; // Imported from constants

  modelId: string | null = null;

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
   * Load model data to pre-select the strategy
   */
  loadModelData(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.selectedStrategy =
          data.label_config?.method === 'majority'
            ? 'Signal from majority'
            : 'Default strategy';
      },
      (error) => {
        console.error('Error loading model data:', error);
        alert('Failed to load model data.');
      }
    );
  }

  /**
   * Update label_config and navigate to the Model Selection component
   */
  goNext(): void {
    if (this.modelId) {
      const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}/label`;

      const payload = {
        label_config: {
          method:
            this.selectedStrategy === 'Default strategy'
              ? 'default'
              : 'majority',
          params: {}, // Assuming no additional params for now
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
}
