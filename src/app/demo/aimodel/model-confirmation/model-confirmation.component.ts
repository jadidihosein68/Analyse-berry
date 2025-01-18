import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-model-confirmation',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './model-confirmation.component.html',
  styleUrls: ['./model-confirmation.component.scss'],
})
export class ModelConfirmationComponent implements OnInit {
  modelId: string | null = null;
  modelConfig: any = {};

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
   * Load model configuration data using the model ID
   */
  loadModelConfig(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.modelConfig = data;
      },
      (error) => {
        console.error('Error loading model config:', error);
        alert('Failed to load model configuration.');
      }
    );
  }

  /**
   * Confirm and create the model
   */
  confirmModelCreation(): void {
    if (this.modelId) {
      const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}/confirm`;

      this.http.post(apiUrl, {}).subscribe(
        () => {
          alert('Model created successfully!');
          this.router.navigate(['/model-dashboard']);
        },
        (error) => {
          console.error('Error confirming model creation:', error);
          alert('Failed to create the model.');
        }
      );
    } else {
      console.error('Model ID is missing.');
    }
  }

  /**
   * Navigate back to the previous step
   */
  goBack(): void {
    if (this.modelId) {
      this.router.navigate(['/model-dashboard/model-selection', this.modelId]);
    } else {
      console.error('Model ID is missing.');
    }
  }
}
