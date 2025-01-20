export const FEATURES = [
    {
      name: 'RSI',
      selected: false,
      parameters: { timeperiod: 14 },
    },
    {
      name: 'MACD',
      selected: false,
      parameters: { fastperiod: 12, slowperiod: 26, signalperiod: 9 },
    },
    {
      name: 'Simple Moving Average (SMA)',
      selected: false,
      parameters: { window: 10 },
    },
    {
      name: 'Exponential Moving Average (EMA)',
      selected: false,
      parameters: { span: 10 },
    },
    {
      name: 'Average True Range (ATR)',
      selected: false,
      parameters: { timeperiod: 14 },
    },
    {
      name: 'Stochastic Oscillator',
      selected: false,
      parameters: {
        fastk_period: 5,
        slowk_period: 3,
        slowk_matype: 0,
        slowd_period: 3,
        slowd_matype: 0,
      },
    },
    {
      name: 'Bollinger Band',
      selected: false,
      parameters: { timeperiod: 20, nbdevup: 2, nbdevdn: 2, matype: 0 },
    },
    {
      name: 'Lag Features',
      selected: false,
      parameters: { lag_period: 5 },
    },
    {
      name: 'Percentage Price Oscillator (PPO)',
      selected: false,
      parameters: { fastperiod: 12, slowperiod: 26, matype: 0 },
    },
  ];
  
  export const STRATEGIES = [
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
  


  export const MODEL = [
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
          defaultValue: 'gini',
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
          defaultValue: 'sqrt',
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
          defaultValue: 'l2',
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
          defaultValue: 'lbfgs',
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
          defaultValue: 'auto',
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
          defaultValue: 'rbf',
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
          defaultValue: 'scale',
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
          defaultValue: 'binary:logistic',
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