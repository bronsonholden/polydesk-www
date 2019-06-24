// TODO: Use dynamic config instead of inflexible compile-time config
export const environment = {
  production: true,
  envName: 'prod',
  apiBase: 'https://api.polydesk.io',
  tokenAuthConfig: {
    apiBase: 'https://api.polydesk.io',
    registerAccountPath: 'accounts'
  }
};
