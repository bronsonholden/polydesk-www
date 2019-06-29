// TODO: Use dynamic config instead of inflexible compile-time config
export const environment = {
  production: true,
  envName: 'prod',
  apiBase: 'https://apilocal.polydesk.io',
  tokenAuthConfig: {
    apiBase: 'https://apilocal.polydesk.io',
    registerAccountPath: 'accounts'
  }
};
