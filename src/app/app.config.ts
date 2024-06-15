import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { loggingInterceptor } from './logging.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // useClass: loggingInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loggingInterceptor,
      multi: true,
    }, provideAnimationsAsync(),
  ]
};
