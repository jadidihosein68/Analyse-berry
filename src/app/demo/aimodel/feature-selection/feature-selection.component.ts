import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
@Component({
  selector: 'app-feature-selection',
  imports: [CommonModule, SharedModule],
  templateUrl: './feature-selection.component.html',
  styleUrls: ['./feature-selection.component.scss']
})
export class FeatureSelectionComponent {
  // List of features with toggle states
  features = [
    { name: 'RSI', selected: false },
    { name: 'MACD', selected: false },
    { name: 'Simple Moving Average (SMA)', selected: false },
    { name: 'Exponential Moving Average (EMA)', selected: false },
    { name: 'Average True Range (ATR)', selected: false },
    { name: 'Stochastic Oscillator', selected: false },
    { name: 'Bollinger Band', selected: false },
    { name: 'Lag Features', selected: false },
    { name: 'Volume-Based Indicators', selected: false },
    { name: 'Percentage Price Oscillator (PPO)', selected: false }
  ];

  /**
   * Toggle the selection of a feature.
   * @param feature - The feature object to toggle
   */
  toggleFeature(feature: any): void {
    feature.selected = !feature.selected;
  }

  /**
   * Log the selected features for demonstration purposes.
   */
  logSelectedFeatures(): void {
    const selectedFeatures = this.features
      .filter(feature => feature.selected)
      .map(feature => feature.name);
    console.log('Selected Features:', selectedFeatures);
    alert(`Selected Features: ${selectedFeatures.join(', ')}`);
  }
}
