// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'development',
  //apiUrl_v2: 'https://api.service.rushforsafety.com/api/v2',
  apiUrl_v2: 'https://service.api.rushforsafety.com/api/v2',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
