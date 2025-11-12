import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
export const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http);
export const appConfig: ApplicationConfig = {
  //traduccion
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), importProvidersFrom(TranslateModule.forRoot(
    {
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }
  ))],
};
