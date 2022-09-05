// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    geoCoder: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    accessToken: 'pk.eyJ1Ijoib21yYW4teW91MjIiLCJhIjoiY2w2dnV5bW55MDFuczNqbzE1YXlzcDF0cCJ9.gWGJc9paJH2w2vxxz2LmyA'
  },
  firebase: {
    apiKey: "AIzaSyAYCBsvJ84PK61G5bo2HZDb4hyGcUdhpiI",
    authDomain: "ovaluate-notification-4acc7.firebaseapp.com",
    projectId: "ovaluate-notification-4acc7",
    storageBucket: "ovaluate-notification-4acc7.appspot.com",
    messagingSenderId: "406110889808",
    appId: "1:406110889808:web:e58018e65b41cf015b6e55",
    measurementId: "G-1P41VJ54D5",
    vapidKey: "BDk3YNMs8VrFyWFNwRP_1Zm1oYMOqYPFrTqIjUvkpO2vcIPBR-IuVIYfC3oWvFYvnK1whvJSA1Ly_k0hCBY7bn0"
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
