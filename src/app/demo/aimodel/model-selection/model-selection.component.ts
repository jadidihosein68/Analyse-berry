import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { MODEL } from 'src/app/constants/model-config.constants';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.scss']
})
export class ModelSelectionComponent {
  // Holds index of the selected model card
  selectedModelIndex: number | null = null;

  constructor(private router: Router) {}
  // Data for each model card
  models = MODEL;

  
  // Called when user clicks "Next" or "Submit"
  onSubmitSelection() {
    if (this.selectedModelIndex === null) {
      alert('Please select a model before proceeding.');
      return;
    }
    const selectedModel = this.models[this.selectedModelIndex];
    console.log('User selected model:', selectedModel.modelKey);
    console.log('Parameters with overrides:', selectedModel.parameters);
    // TODO: Add logic for next steps
  }

  goBack(){
    this.router.navigate(['/model-dashboard/labeling']);
  }
}
