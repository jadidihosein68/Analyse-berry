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
      name: 'Default strategy',
      explanation: 'Suitable for simple scenarios.',
    },
    {
      name: 'Signal from majority',
      explanation:
        'If the majority of technical indicators raise a flag, the system will follow that signal to label. If we reach a 50% scenario on buy and 50% sell, it will be a hold signal.',
    },
  ];
  