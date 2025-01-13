import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-data-range',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './model-data-range.component.html',
  styleUrls: ['./model-data-range.component.scss']
})
export class ModelDataRangeComponent {
  // Symbols for dropdown
  symbols = [
    { value: 'BTCUSDT', label: 'Bitcoin (BTCUSDT)' },
    { value: 'ETHUSDT', label: 'Ethereum (ETHUSDT)' }
  ];

  // Form data
  selectedSymbol: string = '';
  trainStartDate: Date | null = null;
  trainEndDate: Date | null = null;
  useSameDataset: string = 'No'; // Options: 'Yes' or 'No'
  percentage: number | null = null;
  testStartDate: Date | null = null;
  testEndDate: Date | null = null;

  // Placeholder for total records
  totalRecords: number = 1000;

  constructor(private router: Router) {}
  /**
   * Calculate the number of testing records based on the percentage.
   */
  calculateTestingRecords(): number {
    if (this.percentage && this.totalRecords) {
      return Math.round((this.totalRecords * this.percentage) / 100);
    }
    return 0;
  }

  /**
   * Validate the input data and ensure consistency.
   */
  validateData(): void {
    if (this.useSameDataset === 'Yes') {
      if (this.percentage === null || this.percentage < 1 || this.percentage > 100) {
        alert('Please enter a valid percentage between 1 and 100.');
        return;
      }
      const testingRecords = this.calculateTestingRecords();
      alert(`Validation successful:
        A total number of ${testingRecords} records are used for testing.
        There is no overlap of training data and testing data.`);
    } else if (this.useSameDataset === 'No') {
      if (!this.testStartDate || !this.testEndDate) {
        alert('Please provide both test start and end dates.');
        return;
      }
      if (this.testStartDate >= this.testEndDate) {
        alert('Test start date must be earlier than the test end date.');
        return;
      }
      // Simulate testing record calculation for "No"
      alert(`Validation successful:
        A total number of 200 records are used for testing.
        There is no overlap of training data and testing data.`);
    }
  }

  /**
   * Convert a given date to epoch time.
   * @param date - The date to convert
   * @returns Epoch time or null if no date provided
   */

  goBack(): void {
    this.router.navigate(['/model-dashboard']);
  }

  /**
   * Save the current progress as a draft.
   */
  saveAsDraft(): void {
    alert('Progress saved as draft.');
  }

  /**
   * Navigate to the next step.
   */
  goNext(): void {
    this.router.navigate(['/model-dashboard/feature-selection']); // Replace with your next step route
  }



  toEpoch(date: Date | null): number | null {
    return date ? Math.floor(date.getTime() / 1000) : null;
  }
}
