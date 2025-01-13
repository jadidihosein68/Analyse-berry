import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-model-dashboard',
  imports: [CommonModule, SharedModule],
  templateUrl: './model-dashboard.component.html',
  styleUrls: ['./model-dashboard.component.scss']
})
export class ModelDashboardComponent implements OnInit {
  // Sample data for the model table
  models = [
    {
      name: 'Model A',
      type: 'Random Forest',
      dateCreated: '2025-01-10',
      dataSet: 'OHLCV - BTCUSDT',
      accuracy: '92%',
      remarks: 'Highly accurate'
    },
    {
      name: 'Model B',
      type: 'XGBoost',
      dateCreated: '2025-01-11',
      dataSet: 'OHLCV - ETHUSDT',
      accuracy: '89%',
      remarks: 'Good performance'
    },
    {
      name: 'Model C',
      type: 'Neural Network',
      dateCreated: '2025-01-12',
      dataSet: 'OHLCV - LTCUSDT',
      accuracy: '87%',
      remarks: 'Requires fine-tuning'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Placeholder function for training a new model
  onTrainNewModel(): void {
    console.log('Train New Model button clicked');
  }
}
