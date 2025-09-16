import {
    ApplicationConfig,
    LOCALE_ID,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import localeFr from '@angular/common/locales/fr';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';

// Register locale data before bootstrap (in your main.ts or similar)
registerLocaleData(localeFr);
export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi(), withFetch()), // provideHttpClient(withInterceptors([spinnerInterceptor, authInterceptor])), importProvidersFrom(GlobalVariables),
        provideRouter(routes), provideClientHydration(withEventReplay()),

        {
            provide: LOCALE_ID,
            useValue: 'fr-FR'
        }
    ]
};
