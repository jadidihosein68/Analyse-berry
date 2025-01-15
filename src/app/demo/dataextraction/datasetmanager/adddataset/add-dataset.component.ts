import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dataset',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule,HttpClientModule],
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.scss']
})
export class AddDatasetComponent {
  // Form fields
  dataSetName: string = '';
  symbols: string[] = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
  selectedSymbol: string = 'BTCUSDT';
  interval: number | null = null;
  startDate: number | null = null;
  endDate: number | null = null;
  dataSetType: string = 'Training'; // Default value
  totalRecords: number | null = null;

  private baseUrl: string = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Convert epoch to readable date
  toReadableDate(epoch: number | null): string {
    return epoch ? new Date(epoch * 1000).toLocaleString() : 'N/A';
  }

  // Submit dataset with validation and confirmation
  onSubmit(): void {
    // Validate required fields
    if (
      !this.dataSetName ||
      !this.selectedSymbol ||
      !this.interval ||
      !this.startDate ||
      !this.endDate ||
      !this.dataSetType
    ) {
      alert('All fields are required!');
      return;
    }

    // Validate interval (multiple of 5)
    if (this.interval % 5 !== 0) {
      alert('Interval must be a multiple of 5.');
      return;
    }

    // Fetch total records
    const countRecordsUrl = `${this.baseUrl}/count_records_by_interval`;
    const queryParams = `?symbol=${this.selectedSymbol}&start_close_time=${this.startDate}&end_close_time=${this.endDate}&interval=${this.interval}`;

    this.http.get<{ total_records: number }>(countRecordsUrl + queryParams).subscribe(
      (response) => {
        this.totalRecords = response.total_records;

        // Confirm with the user
        const confirmation = confirm(
          `Dataset Details:
          - Name: ${this.dataSetName}
          - Symbol: ${this.selectedSymbol}
          - Interval: ${this.interval} minutes
          - Start Date: ${this.toReadableDate(this.startDate)}
          - End Date: ${this.toReadableDate(this.endDate)}
          - Data Set Type: ${this.dataSetType}
          - Total Records: ${this.totalRecords}
          
          Do you want to submit?`
        );

        if (confirmation) {
          this.submitDataset();
        }
      },
      (error) => {
        console.error('Error fetching total records:', error);
        alert('Failed to calculate total records. Please try again.');
      }
    );
  }

  // Submit dataset to the API
  private submitDataset(): void {
    const submitUrl = `${this.baseUrl}/data_collection`;
    const payload = {
      name_of_dataset: this.dataSetName,
      symbol: this.selectedSymbol,
      interval: `${this.interval}m`, // Append 'm' to match interval format
      startdate: this.startDate,
      enddate: this.endDate,
      dataset_type: this.dataSetType,
      total_records: this.totalRecords
    };

    this.http.post(submitUrl, payload).subscribe(
      () => {
        alert('Dataset submitted successfully!');
        this.router.navigate(['/data-set-manager']);
      },
      (error) => {
        console.error('Error submitting dataset:', error);
        alert('Failed to submit dataset. Please try again.');
      }
    );
  }

  // Cancel action to navigate back
  onCancel(): void {
    this.router.navigate(['/data-set-manager']); // Navigate back to the Data Set Manager
  }
}
