import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdmiRoutes } from './admi/admi.routes';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(AdmiRoutes), provideAnimationsAsync(),

  ],
};

const firebaseConfig = {
  apiKey: "AIzaSyDojCW0dZM-kxYqFE_W9DFdSK2-1-WyZBI",
  authDomain: "banquesoft-1aee1.firebaseapp.com",
  projectId: "banquesoft-1aee1",
  storageBucket: "banquesoft-1aee1.appspot.com",
  messagingSenderId: "62678103280",
  appId: "1:62678103280:web:bc9a71d0405bc84fa2be35",
  measurementId: "G-K3WPW5N4WV"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
