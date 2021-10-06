export const environment = {
  production: true,
  environmentName: 'Production',
  // apiUrl_v2: 'https://api.service.rushforsafety.com/api/v2',
  apiUrl_v2: 'https://o3kd6zntk0.execute-api.ap-south-1.amazonaws.com/Development/api',
  tenantId: '7046acc7-d86a-47fe-ba66-03e831fcfdbe', // replace with yours one here
  authority: 'https://login.microsoftonline.com/7046acc7-d86a-47fe-ba66-03e831fcfdbe/',
  clientId: 'a42b32f6-213f-47cc-9f59-374d311623cd', // replace with yours one here
  redirectUri: 'https://admin.rushforsafety.com', // replace with the yours one here
  postLogoutRedirectUri: 'https://admin.rushforsafety.com/logout', // replace with yours one here
  extraQueryParameter: 'nux=1', //(optional),
  scopes: [
    'user.read',
    'directory.accessasuser.all'
  ]
};