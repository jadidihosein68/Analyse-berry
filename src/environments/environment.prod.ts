import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  apiBaseUrl: 'https://your-production-api-url.com',
  production: true
};
