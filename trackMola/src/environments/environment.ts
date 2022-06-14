// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './interface';

export const environment: Environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDjZiWjFVIsdBZy6C-NsUB6iWO7PdXN9yc',
    authDomain: 'trackmola-e24ef.firebaseapp.com',
    databaseURL:
      'https://trackmola-e24ef-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'trackmola-e24ef',
    storageBucket: 'trackmola-e24ef.appspot.com',
    messagingSenderId: '863694910095',
    appId: '1:863694910095:web:90a2cf13487f82b4ecb6fa',
    measurementId: 'G-MNHDSH1PFW',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
