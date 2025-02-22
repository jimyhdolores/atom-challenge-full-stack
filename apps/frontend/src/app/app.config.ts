import { OverlayModule } from '@angular/cdk/overlay';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './commons/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([authInterceptor])),
		importProvidersFrom(OverlayModule),
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				autoFocus: 'dialog',
				restoreFocus: true,
			},
		},
	],
};
