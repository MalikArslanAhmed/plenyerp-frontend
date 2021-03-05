// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    qa: false,
    dev: false,
    local: true,
    pubNubChannelPrefix: 'dev_',
    staging: false,
    // appUrl: 'http://appUrlpi.dss.luezoid.com/',
   // appUrl: 'http://api.erp.valuescale.co.in/',
      appUrl: 'http://localhost:8000/',
    // appUrl: 'http://209.97.184.185/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
