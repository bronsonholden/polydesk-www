// TODO: Use dynamic config instead of inflexible compile-time config
export const environment = {
  production: true,
  envName: 'prod',
  apiBase: 'https://apilocal.polydesk.io',
  tokenAuthConfig: {
    apiBase: 'https://apilocal.polydesk.io',
    registerAccountPath: 'accounts'
  },
  googleMapsApiKey: 'AIzaSyD3KfzlpR4YStSn1tjXUvo1tyK8eK9bxUs'
};
