import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dataset',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.scss']
})
export class AddDatasetComponent {
  // Form fields
  dataSetName: string = '';
  symbols: string[] = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']; // Mock dropdown options
  selectedSymbol: string = 'BTCUSDT';
  interval: number | null = null;
  startDate: number | null = null;
  endDate: number | null = null;
  dataSetType: string = 'Training'; // Default dataset type

  constructor(private router: Router) {}

  // Convert epoch to readable date
  toReadableDate(epoch: number | null): string {
    return epoch ? new Date(epoch * 1000).toLocaleString() : 'N/A';
  }

  // Validate and Submit
  onSubmit(): void {
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
    console.log('Dataset submitted:', {
      dataSetName: this.dataSetName,
      selectedSymbol: this.selectedSymbol,
      interval: this.interval,
      startDate: this.startDate,
      endDate: this.endDate,
      dataSetType: this.dataSetType
    });
  }

  // Cancel action to navigate back
  onCancel(): void {
    this.router.navigate(['/data-set-manager']); // Navigate back to the Data Set Manager
  }
}
