import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-data-set-manager',
  standalone: true,
  
  imports: [CommonModule , SharedModule],
  templateUrl: './data-set-manager.component.html',
  styleUrls: ['./data-set-manager.component.scss']
})
export class DataSetManagerComponent {
  // Mock data for the table
  dataSets = [
    {
      name: 'Data Set 1',
      symbol: 'BTCUSDT',
      startDate: 1672531200, // Epoch time
      endDate: 1672617600, // Epoch time
      totalRecords: 1000,
      type: 'Training'
    },
    {
      name: 'Data Set 2',
      symbol: 'ETHUSDT',
      startDate: 1672704000,
      endDate: 1672790400,
      totalRecords: 1500,
      type: 'Testing'
    }
  ];

  constructor(private router: Router) {}

  // Navigate to the data set details component
  goToDetails(dataSetName: string): void {
    this.router.navigate(['/data-set-details', { name: dataSetName }]);
  }

  // Convert epoch time to a human-readable date
  formatDate(epochTime: number): string {
    return new Date(epochTime * 1000).toLocaleString();
  }

  // Add new data set (navigate to a new component or open a modal)
  addDataSet(): void {
    this.router.navigate(['/add-data-set']);
  }
}
