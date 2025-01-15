import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment'; 


@Component({
  selector: 'app-data-set-manager',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './data-set-manager.component.html',
  styleUrls: ['./data-set-manager.component.scss']
})
export class DataSetManagerComponent implements OnInit {
  dataSets: any[] = []; // Data for the table
  apiUrl: string = `${environment.apiBaseUrl}/api/data_collections`; // API URL

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataSets(); // Fetch datasets on component load
  }

  /**
   * Load datasets from the API
   */
  loadDataSets(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.dataSets = response.map((record) => ({
          name: record.name_of_dataset,
          symbol: record.symbol,
          startDate: record.startdate,
          endDate: record.enddate,
          totalRecords: record.total_records,
          type: record.dataset_type,
        }));
      },
      (error) => {
        console.error('Error fetching datasets:', error);
        alert('Failed to load datasets from the server.');
      }
    );
  }

  /**
   * Navigate to the data set details component
   */
  goToDetails(dataSetName: string): void {
    this.router.navigate(['/data-set-details', { name: dataSetName }]);
  }

  /**
   * Convert epoch time to a human-readable date
   */
  formatDate(epochTime: number): string {
    return new Date(epochTime * 1000).toLocaleString();
  }

  /**
   * Navigate to add data set form
   */
  addDataSet(): void {
    this.router.navigate(['/data-set-manager/add-data-set']);
  }

  /**
   * Export data set logic (to be implemented later)
   */
  exportData(dataName: string): void {
    console.log(`Exporting data set: ${dataName}`);
  }
}
