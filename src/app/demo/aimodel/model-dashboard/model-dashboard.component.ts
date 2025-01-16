import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-model-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './model-dashboard.component.html',
  styleUrls: ['./model-dashboard.component.scss']
})
export class ModelDashboardComponent implements OnInit {
  models: any[] = [];

  private apiUrl = `${environment.apiBaseUrl}/api/model_config`; // Endpoint

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadModels();
  }

  /**
   * Fetch all model configurations from the API
   */
  loadModels(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        // Map the API response to match table fields
        // The table displays:
        //   - name => model_name
        //   - type => model_type
        //   - dateCreated => date_of_creation
        //   - dataSet => training_dataset_name
        //   - accuracy => accuracy_percent
        //   - remarks => remark
        this.models = response.map((item) => ({
          name: item.model_name,
          type: item.model_type,
          dateCreated: item.date_of_creation,
          dataSet: item.training_dataset_name,
          accuracy: item.accuracy_percent + '%',
          remarks: item.remark
        }));
      },
      (error) => {
        console.error('Error fetching model configs:', error);
        alert('Failed to load models from the server.');
      }
    );
  }

  // Navigate to the "Select Data" or "Model Config" page
  navigateToSelectDate(): void {
    // This triggers the 'Train New Model' flow
    this.router.navigate(['/model-dashboard/model-config']);
  }
}
