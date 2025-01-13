import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-labeling',
  imports: [CommonModule, SharedModule],
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.scss']
})
export class LabelingComponent {
  // Selected strategy
  selectedStrategy: string = 'Default strategy';

  // Strategies with explanations
  strategies = [
    {
      name: 'Default strategy',
      explanation: 'Suitable for simple scenarios.'
    },
    {
      name: 'Signal from majority',
      explanation:
        'If the majority of technical indicators raise a flag, the system will follow that signal to label. If we reach a 50% scenario on buy and 50% sell, it will be a hold signal.'
    }
  ];

  constructor(private router: Router) {}
  /**
   * Create the model with the selected strategy.
   */
  createModel(): void {
    alert(`Model created using the "${this.selectedStrategy}" strategy.`);
  }

  /**
   * Navigate back to the previous page.
   */
  goBack(): void {
    this.router.navigate(['/model-dashboard/feature-selection']);
  }
}
