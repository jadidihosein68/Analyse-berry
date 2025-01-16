import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';


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
  models = [
    {
      displayName: 'Random Forest Classifier (RandomForestClassifier)',
      modelKey: 'randomForest',
      parameters: [
        {
          name: 'n_estimators',
          type: 'int',
          defaultValue: '100',
          mandatory: 'No',
          description: 'Number of trees in the forest.',
          userValue: '' // store user override
        },
        {
          name: 'criterion',
          type: 'str',
          defaultValue: '"gini"',
          mandatory: 'No',
          description: 'Function to measure split quality: "gini", "entropy", "log_loss".',
          userValue: ''
        },
        {
          name: 'max_depth',
          type: 'int or None',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Maximum depth of the tree (unlimited if None).',
          userValue: ''
        },
        {
          name: 'min_samples_split',
          type: 'int or float',
          defaultValue: '2',
          mandatory: 'No',
          description: 'Minimum number of samples required to split an internal node.',
          userValue: ''
        },
        {
          name: 'min_samples_leaf',
          type: 'int or float',
          defaultValue: '1',
          mandatory: 'No',
          description: 'Minimum number of samples required to be at a leaf node.',
          userValue: ''
        },
        {
          name: 'min_weight_fraction_leaf',
          type: 'float',
          defaultValue: '0.0',
          mandatory: 'No',
          description: 'Minimum weighted fraction of samples required at a leaf.',
          userValue: ''
        },
        {
          name: 'max_features',
          type: 'str, int, or float',
          defaultValue: '"sqrt"',
          mandatory: 'No',
          description: 'Number of features to consider for the best split.',
          userValue: ''
        },
        {
          name: 'max_leaf_nodes',
          type: 'int',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Maximum number of leaf nodes.',
          userValue: ''
        },
        {
          name: 'bootstrap',
          type: 'bool',
          defaultValue: 'True',
          mandatory: 'No',
          description: 'Whether bootstrap samples are used to build trees.',
          userValue: ''
        },
        {
          name: 'oob_score',
          type: 'bool',
          defaultValue: 'False',
          mandatory: 'No',
          description: 'Whether to use out-of-bag samples for validation.',
          userValue: ''
        },
        {
          name: 'random_state',
          type: 'int',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Seed for reproducibility.',
          userValue: ''
        },
        {
          name: 'n_jobs',
          type: 'int',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Number of parallel jobs (-1 uses all processors).',
          userValue: ''
        }
      ]
    },
    {
      displayName: 'Logistic Regression (LogisticRegression)',
      modelKey: 'logisticRegression',
      parameters: [
        {
          name: 'penalty',
          type: 'str',
          defaultValue: '"l2"',
          mandatory: 'No',
          description: 'Regularization type: "l1", "l2", "elasticnet", or "none".',
          userValue: ''
        },
        {
          name: 'dual',
          type: 'bool',
          defaultValue: 'False',
          mandatory: 'No',
          description: 'Dual formulation (only for l2 penalty with liblinear solver).',
          userValue: ''
        },
        {
          name: 'tol',
          type: 'float',
          defaultValue: '1e-4',
          mandatory: 'No',
          description: 'Tolerance for stopping criteria.',
          userValue: ''
        },
        {
          name: 'C',
          type: 'float',
          defaultValue: '1.0',
          mandatory: 'No',
          description: 'Inverse regularization strength (smaller -> stronger regularization).',
          userValue: ''
        },
        {
          name: 'fit_intercept',
          type: 'bool',
          defaultValue: 'True',
          mandatory: 'No',
          description: 'Whether to include an intercept in the model.',
          userValue: ''
        },
        {
          name: 'solver',
          type: 'str',
          defaultValue: '"lbfgs"',
          mandatory: 'Yes (if penalty="l1")',
          description: 'Optimization algorithm: "lbfgs", "liblinear", "saga".',
          userValue: ''
        },
        {
          name: 'max_iter',
          type: 'int',
          defaultValue: '100',
          mandatory: 'No',
          description: 'Maximum number of iterations for convergence.',
          userValue: ''
        },
        {
          name: 'multi_class',
          type: 'str',
          defaultValue: '"auto"',
          mandatory: 'No',
          description: 'Multi-class strategy: "auto", "ovr", "multinomial".',
          userValue: ''
        },
        {
          name: 'warm_start',
          type: 'bool',
          defaultValue: 'False',
          mandatory: 'No',
          description: 'Reuse solution from the previous call to fit.',
          userValue: ''
        }
      ]
    },
    {
      displayName: 'Support Vector Classifier (SVC)',
      modelKey: 'svc',
      parameters: [
        {
          name: 'C',
          type: 'float',
          defaultValue: '1.0',
          mandatory: 'No',
          description: 'Regularization parameter (higher -> less regularization).',
          userValue: ''
        },
        {
          name: 'kernel',
          type: 'str',
          defaultValue: '"rbf"',
          mandatory: 'No',
          description: 'Kernel type: "linear", "poly", "rbf", "sigmoid".',
          userValue: ''
        },
        {
          name: 'degree',
          type: 'int',
          defaultValue: '3',
          mandatory: 'No',
          description: 'Degree of the polynomial kernel (used with "poly" kernel).',
          userValue: ''
        },
        {
          name: 'gamma',
          type: 'str or float',
          defaultValue: '"scale"',
          mandatory: 'No',
          description: 'Kernel coefficient: "scale", "auto", or manually set.',
          userValue: ''
        },
        {
          name: 'probability',
          type: 'bool',
          defaultValue: 'False',
          mandatory: 'No',
          description: 'Whether to enable probability estimates.',
          userValue: ''
        },
        {
          name: 'random_state',
          type: 'int or None',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Seed for reproducibility (added in your code).',
          userValue: ''
        },
        {
          name: 'tol',
          type: 'float',
          defaultValue: '1e-3',
          mandatory: 'No',
          description: 'Tolerance for stopping criteria.',
          userValue: ''
        },
        {
          name: 'cache_size',
          type: 'float',
          defaultValue: '200',
          mandatory: 'No',
          description: 'Size of the kernel cache in MB.',
          userValue: ''
        },
        {
          name: 'class_weight',
          type: 'dict or str',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Class weights: "balanced" or custom dictionary.',
          userValue: ''
        }
      ]
    },
    {
      displayName: 'XGBoost Classifier (XGBClassifier)',
      modelKey: 'xgboost',
      parameters: [
        {
          name: 'n_estimators',
          type: 'int',
          defaultValue: '100',
          mandatory: 'No',
          description: 'Number of boosting rounds.',
          userValue: ''
        },
        {
          name: 'learning_rate',
          type: 'float',
          defaultValue: '0.3',
          mandatory: 'No',
          description: 'Boosting learning rate.',
          userValue: ''
        },
        {
          name: 'max_depth',
          type: 'int',
          defaultValue: '6',
          mandatory: 'No',
          description: 'Maximum depth of a tree.',
          userValue: ''
        },
        {
          name: 'min_child_weight',
          type: 'int',
          defaultValue: '1',
          mandatory: 'No',
          description: 'Minimum sum of instance weight in a child.',
          userValue: ''
        },
        {
          name: 'subsample',
          type: 'float',
          defaultValue: '1.0',
          mandatory: 'No',
          description: 'Subsample ratio of training instances.',
          userValue: ''
        },
        {
          name: 'colsample_bytree',
          type: 'float',
          defaultValue: '1.0',
          mandatory: 'No',
          description: 'Subsample ratio of columns in each tree.',
          userValue: ''
        },
        {
          name: 'objective',
          type: 'str',
          defaultValue: '"binary:logistic"',
          mandatory: 'No',
          description: 'Learning task: "binary:logistic", "multi:softmax", etc.',
          userValue: ''
        },
        {
          name: 'eval_metric',
          type: 'str or list',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Evaluation metric: "logloss", "error", etc.',
          userValue: ''
        },
        {
          name: 'random_state',
          type: 'int',
          defaultValue: 'None',
          mandatory: 'No',
          description: 'Seed for reproducibility.',
          userValue: ''
        },
        {
          name: 'verbosity',
          type: 'int',
          defaultValue: '1',
          mandatory: 'No',
          description: 'Controls the level of verbosity.',
          userValue: ''
        },
        {
          name: 'use_label_encoder',
          type: 'bool',
          defaultValue: 'True',
          mandatory: 'No',
          description: 'Disable automatic label encoding warnings (explicitly set to False in your code).',
          userValue: ''
        }
      ]
    }
  ];

  
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
