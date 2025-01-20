import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-labeling',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.scss'],
})
export class LabelingComponent implements OnInit {
  selectedStrategy: string = ''; // User-selected strategy
  selectedStrategyParams: Record<string, any> = {}; // Editable parameters for the selected strategy

  strategies = [
    {
      name: 'Next-Step Classification',
      parameters: {
        horizon: 24,
        threshold: 0.01,
        threshold_type: 'percent',
      },
      description:
        "Think of this like guessing if tomorrow you'll be taller than today. We look at the price after a certain time (24 hours here). If it goes up more than 1%, we call it 'up'; if it doesn't, we call it 'down'. Very common in intraday or short-term crypto trading strategies. Crypto’s volatility means next-step classification often needs tight thresholds and frequent updates.",
    },
    {
      name: 'Multi-Class Trend Labeling',
      parameters: {
        timeHorizon: 24,
        bins: [-0.02, -0.01, 0, 0.01, 0.02],
        bin_labels: ['big drop', 'small drop', 'no change', 'small rise', 'big rise'],
      },
      description:
        "Imagine sorting different sizes of candy into boxes: small, medium, large. Here we sort price changes into groups like 'big drop', 'small drop', 'no change', 'small rise', and 'big rise'.Useful if you believe the magnitude of trends matters significantly (common in crypto due to high volatility). Multi-class labeling can capture more nuanced market shifts than simple up/down.",
    },
    {
      name: 'Triple-Barrier Labeling',
      parameters: {
        upper_barrier: 0.02,
        lower_barrier: 0.02,
        maxTime: 24,
      },
      description:
        "Picture placing two fences around a bouncing ball—one above and one below. If the ball crosses the top fence first, it's a 'win'; if it crosses the bottom fence, it's a 'loss'; if it doesn't hit either fence in time, it's a 'draw'. Very valid in crypto algo trading, as it neatly defines the outcome of a trade in a volatile environment. Ensures you systematically capture both upward and downward price swings plus the effect of time constraints (e.g., if the market is flat).",
    },
    {
      name: 'Regression on Future Returns',
      parameters: {
        lookahead: 24,
        target_type: 'percentage',
      },
      description:
        "Think of this as trying to guess exactly how much taller you'll be tomorrow. Instead of just saying 'taller or shorter,' we predict the actual amount of price change.",
    },
    {
      name: 'Event-Based Labeling',
      parameters: {
        eventDefinition: ['RSI crosses below 30'],
        lookahead: 24,
      },
      description:
        "Imagine waiting for a special moment, like a birthday surprise. The event here is when a specific indicator (like RSI < 30) happens. We label times that lead up to the surprise as 'event' and others as 'no event'.",
    },
  ];

  modelId: string | null = null; // Model ID from the route

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
   * Load model data to pre-select the strategy and its parameters
   */
  loadModelData(): void {
    const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        const selectedStrategy = this.strategies.find(
          (strategy) => strategy.name === data.label_config?.method
        );
        this.selectedStrategy = selectedStrategy ? selectedStrategy.name : '';
        this.selectedStrategyParams = selectedStrategy
          ? { ...selectedStrategy.parameters }
          : {};
      },
      (error) => {
        console.error('Error loading model data:', error);
        alert('Failed to load model data.');
      }
    );
  }

  /**
   * Handle strategy change
   */
  onStrategyChange(strategy: any): void {
    this.selectedStrategyParams = { ...strategy.parameters };
  }

  /**
   * Helper method to check if a value is an array
   */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Add a new item to an array parameter
   */
  addArrayItem(paramKey: string): void {
    if (!Array.isArray(this.selectedStrategyParams[paramKey])) {
      this.selectedStrategyParams[paramKey] = [];
    }
    // Add an empty item (could be '' or any default)
    this.selectedStrategyParams[paramKey].push('');
  }

  /**
   * Remove an item from an array parameter at the given index
   */
  removeArrayItem(paramKey: string, index: number): void {
    if (Array.isArray(this.selectedStrategyParams[paramKey])) {
      this.selectedStrategyParams[paramKey].splice(index, 1);
    }
  }

  /**
   * Update label_config and navigate to the Model Selection component
   */
  goNext(): void {
    if (this.modelId) {
      const apiUrl = `${environment.apiBaseUrl}/api/model_config/${this.modelId}/label`;

      const payload = {
        label_config: {
          method: this.selectedStrategy,
          params: this.selectedStrategyParams,
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
