import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { BbFoundationModule } from '@bb/foundation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(BbFoundationModule.forRoot({
      debug: true,
      defaultTheme: 'coastal',
      enableFallbacks: true,
      enableSystemMode: true
    }))
  ]
};
