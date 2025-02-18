export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
      
    ]
  },
  
  /*
  {
    id: 'page',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/guest/login',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/guest/register',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  },


  {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'ti ti-typography'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'ti ti-brush'
      },
      
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/berry-angular/',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  },

*/
  
  {
    id: 'dataextraction',
    title: 'Data Extraction',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'binance-data',
        title: 'OHLCV Data',
        type: 'item',
        url: '/binance-data',
        classes: 'nav-item',
        icon: 'ti ti-brand-binance'
      },
      {
        id: 'data-set-manager',
        title: 'Data Set Manager',
        type: 'item',
        url: '/data-set-manager',
        classes: 'nav-item',
        icon: 'ti ti-brand-binance'
      }

    ]
  }
  ,
  {
    id: 'model',
    title: 'AI Models',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'generate-model',
        title: 'Generate Model',
        type: 'item',
        url: '/model-dashboard',
        classes: 'nav-item',
        icon: 'ti ti-robot'
      },
    ]
  },
  {
    id: 'backtesting',
    title: 'Backtesting',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'backtesting-playground',
        title: 'Playground',
        type: 'item',
        url: '/backtesting-playground',
        classes: 'nav-item',
        icon: 'ti ti-chart-line'
      },
    ]
  }


];
