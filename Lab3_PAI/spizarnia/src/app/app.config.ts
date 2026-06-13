import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/*
 * Różnica NgModule vs standalone:
 * - Klasycznie: AppModule deklaruje komponenty, importuje moduły (RouterModule, BrowserModule),
 *   providers w @NgModule — wszystko w jednym pliku modułu.
 * - Standalone: brak AppModule; bootstrapApplication(AppComponent, appConfig) —
 *   konfiguracja globalna w appConfig (provideRouter, provideHttpClient itd.),
 *   każdy komponent sam importuje zależności w tablicy imports.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
