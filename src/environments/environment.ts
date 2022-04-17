// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './environment.interface'

export const environment: IEnvironment = {
  production: false,
  baseApiUrl: 'https://localhost:7134',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlfFxNB5rRGVPqP_Oy3UbvHFV-4827--I",
  authDomain: "hearingbooks.firebaseapp.com",
  projectId: "hearingbooks",
  storageBucket: "hearingbooks-8c734.appspot.com",
  messagingSenderId: "1008287872305",
  appId: "1:1008287872305:web:e1d5f3f5b2927430fd2c10",
  measurementId: "G-99HYFMCZJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);