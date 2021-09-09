export const environment = {
  production: true,
  environmentName: 'Production',
  apiUrl_v2: 'https://admin.api.rushforsafety.com/api/v2',
  tenantId: '7046acc7-d86a-47fe-ba66-03e831fcfdbe', // replace with yours one here
  authority: 'https://login.microsoftonline.com/7046acc7-d86a-47fe-ba66-03e831fcfdbe/',
  clientId: 'a42b32f6-213f-47cc-9f59-374d311623cd', // replace with yours one here
  redirectUri: 'http://localhost:4200', // replace with the yours one here
  postLogoutRedirectUri: 'http://localhost:4200/logout', // replace with yours one here
  extraQueryParameter: 'nux=1', //(optional),
  scopes: [
    'user.read',
    'directory.accessasuser.all'
  ]
};